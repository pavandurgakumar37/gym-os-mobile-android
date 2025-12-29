const express = require('express');
const jwt = require('jsonwebtoken');
const Payment = require('../models/Payment');
const Member = require('../models/Member');

const router = express.Router();

// Middleware to verify token
const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({message: 'No token, authorization denied'});
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your-secret-key',
    );
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({message: 'Token is not valid'});
  }
};

// @route   GET /api/payments
// @desc    Get all payments
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const {status, paymentType, memberId} = req.query;
    const filter = {};

    if (status) filter.paymentStatus = status;
    if (paymentType) filter.paymentType = paymentType;
    if (memberId) filter.memberId = memberId;

    const payments = await Payment.find(filter)
      .populate('memberId')
      .populate('processedBy', 'name email')
      .sort({paymentDate: -1});

    res.json(payments);
  } catch (error) {
    console.error('Get payments error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   GET /api/payments/:id
// @desc    Get payment by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('memberId')
      .populate('processedBy', 'name email');

    if (!payment) {
      return res.status(404).json({message: 'Payment not found'});
    }

    res.json(payment);
  } catch (error) {
    console.error('Get payment error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   POST /api/payments
// @desc    Create new payment
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const {
      memberId,
      amount,
      paymentMethod,
      paymentType,
      membershipType,
      period,
      notes,
    } = req.body;

    const payment = new Payment({
      memberId,
      amount,
      paymentMethod,
      paymentType,
      membershipType,
      period,
      notes,
      processedBy: req.user.userId,
    });

    await payment.save();
    await payment.populate('memberId');
    await payment.populate('processedBy', 'name email');

    // Add payment to member's payment history
    const member = await Member.findById(memberId);
    if (member) {
      member.payments.push(payment._id);
      await member.save();
    }

    res.status(201).json(payment);
  } catch (error) {
    console.error('Create payment error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   PUT /api/payments/:id
// @desc    Update payment
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({message: 'Payment not found'});
    }

    const {
      amount,
      paymentMethod,
      paymentStatus,
      paymentType,
      membershipType,
      period,
      transactionId,
      notes,
    } = req.body;

    if (amount) payment.amount = amount;
    if (paymentMethod) payment.paymentMethod = paymentMethod;
    if (paymentStatus) payment.paymentStatus = paymentStatus;
    if (paymentType) payment.paymentType = paymentType;
    if (membershipType) payment.membershipType = membershipType;
    if (period) payment.period = period;
    if (transactionId) payment.transactionId = transactionId;
    if (notes !== undefined) payment.notes = notes;

    await payment.save();
    await payment.populate('memberId');
    await payment.populate('processedBy', 'name email');

    res.json(payment);
  } catch (error) {
    console.error('Update payment error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   DELETE /api/payments/:id
// @desc    Delete payment
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);

    if (!payment) {
      return res.status(404).json({message: 'Payment not found'});
    }

    // Remove payment from member's payment history
    const member = await Member.findById(payment.memberId);
    if (member) {
      member.payments = member.payments.filter(
        p => p.toString() !== payment._id.toString(),
      );
      await member.save();
    }

    await Payment.findByIdAndDelete(req.params.id);

    res.json({message: 'Payment deleted successfully'});
  } catch (error) {
    console.error('Delete payment error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   GET /api/payments/stats/summary
// @desc    Get payment statistics
// @access  Private
router.get('/stats/summary', auth, async (req, res) => {
  try {
    const totalRevenue = await Payment.aggregate([
      {$match: {paymentStatus: 'completed'}},
      {$group: {_id: null, total: {$sum: '$amount'}}},
    ]);

    const monthlyRevenue = await Payment.aggregate([
      {
        $match: {
          paymentStatus: 'completed',
          paymentDate: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
          },
        },
      },
      {$group: {_id: null, total: {$sum: '$amount'}}},
    ]);

    const pendingPayments = await Payment.countDocuments({
      paymentStatus: 'pending',
    });

    const byType = await Payment.aggregate([
      {$match: {paymentStatus: 'completed'}},
      {$group: {_id: '$paymentType', total: {$sum: '$amount'}}},
    ]);

    const byMethod = await Payment.aggregate([
      {$match: {paymentStatus: 'completed'}},
      {$group: {_id: '$paymentMethod', total: {$sum: '$amount'}}},
    ]);

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      monthlyRevenue: monthlyRevenue[0]?.total || 0,
      pendingPayments,
      byType,
      byMethod,
    });
  } catch (error) {
    console.error('Get payment stats error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

module.exports = router;
