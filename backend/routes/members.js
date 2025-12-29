const express = require('express');
const jwt = require('jsonwebtoken');
const Member = require('../models/Member');
const User = require('../models/User');

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

// @route   GET /api/members
// @desc    Get all members
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const {status, membershipType} = req.query;
    const filter = {};

    if (status) filter.membershipStatus = status;
    if (membershipType) filter.membershipType = membershipType;

    const members = await Member.find(filter)
      .populate('userId', 'name email phone avatar')
      .populate('assignedTrainer', 'name email')
      .sort({createdAt: -1});

    res.json(members);
  } catch (error) {
    console.error('Get members error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   GET /api/members/:id
// @desc    Get member by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const member = await Member.findById(req.params.id)
      .populate('userId', 'name email phone avatar')
      .populate('assignedTrainer', 'name email')
      .populate('payments')
      .populate('workouts');

    if (!member) {
      return res.status(404).json({message: 'Member not found'});
    }

    res.json(member);
  } catch (error) {
    console.error('Get member error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   POST /api/members
// @desc    Create new member
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const {
      userId,
      membershipType,
      membershipEndDate,
      personalDetails,
      fitnessGoals,
      healthConditions,
      assignedTrainer,
      notes,
    } = req.body;

    // Check if member already exists for this user
    const existingMember = await Member.findOne({userId});
    if (existingMember) {
      return res.status(400).json({message: 'Member already exists for this user'});
    }

    const member = new Member({
      userId,
      membershipType,
      membershipEndDate,
      personalDetails,
      fitnessGoals,
      healthConditions,
      assignedTrainer,
      notes,
    });

    await member.save();
    await member.populate('userId', 'name email phone avatar');

    res.status(201).json(member);
  } catch (error) {
    console.error('Create member error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   PUT /api/members/:id
// @desc    Update member
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({message: 'Member not found'});
    }

    const {
      membershipType,
      membershipEndDate,
      membershipStatus,
      personalDetails,
      fitnessGoals,
      healthConditions,
      assignedTrainer,
      notes,
    } = req.body;

    if (membershipType) member.membershipType = membershipType;
    if (membershipEndDate) member.membershipEndDate = membershipEndDate;
    if (membershipStatus) member.membershipStatus = membershipStatus;
    if (personalDetails) member.personalDetails = personalDetails;
    if (fitnessGoals) member.fitnessGoals = fitnessGoals;
    if (healthConditions) member.healthConditions = healthConditions;
    if (assignedTrainer) member.assignedTrainer = assignedTrainer;
    if (notes !== undefined) member.notes = notes;

    await member.save();
    await member.populate('userId', 'name email phone avatar');
    await member.populate('assignedTrainer', 'name email');

    res.json(member);
  } catch (error) {
    console.error('Update member error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   DELETE /api/members/:id
// @desc    Delete member
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({message: 'Member not found'});
    }

    await Member.findByIdAndDelete(req.params.id);

    res.json({message: 'Member deleted successfully'});
  } catch (error) {
    console.error('Delete member error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   POST /api/members/:id/attendance
// @desc    Add attendance record
// @access  Private
router.post('/:id/attendance', auth, async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({message: 'Member not found'});
    }

    const {checkIn, checkOut} = req.body;

    member.attendance.push({
      date: new Date(),
      checkIn,
      checkOut,
    });

    await member.save();

    res.json(member);
  } catch (error) {
    console.error('Add attendance error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   GET /api/members/:id/attendance
// @desc    Get member attendance
// @access  Private
router.get('/:id/attendance', auth, async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);

    if (!member) {
      return res.status(404).json({message: 'Member not found'});
    }

    res.json(member.attendance);
  } catch (error) {
    console.error('Get attendance error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

module.exports = router;
