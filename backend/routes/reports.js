const express = require('express');
const jwt = require('jsonwebtoken');
const Member = require('../models/Member');
const Equipment = require('../models/Equipment');
const Payment = require('../models/Payment');
const Workout = require('../models/Workout');
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

// @route   GET /api/reports/dashboard
// @desc    Get dashboard statistics
// @access  Private
router.get('/dashboard', auth, async (req, res) => {
  try {
    // Member statistics
    const totalMembers = await Member.countDocuments();
    const activeMembers = await Member.countDocuments({
      membershipStatus: 'active',
    });
    const expiredMembers = await Member.countDocuments({
      membershipStatus: 'expired',
    });

    // Equipment statistics
    const totalEquipment = await Equipment.countDocuments();
    const availableEquipment = await Equipment.countDocuments({
      status: 'available',
    });
    const maintenanceEquipment = await Equipment.countDocuments({
      status: 'maintenance',
    });

    // Payment statistics
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

    // Workout statistics
    const totalWorkouts = await Workout.countDocuments();
    const publicWorkouts = await Workout.countDocuments({isPublic: true});

    // User statistics
    const totalUsers = await User.countDocuments();
    const trainers = await User.countDocuments({role: 'trainer'});

    // Recent activity (last 7 days)
    const recentPayments = await Payment.find({
      paymentDate: {$gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)},
    })
      .populate('memberId')
      .sort({paymentDate: -1})
      .limit(5);

    const recentMembers = await Member.find({
      createdAt: {$gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)},
    })
      .populate('userId', 'name email')
      .sort({createdAt: -1})
      .limit(5);

    res.json({
      members: {
        total: totalMembers,
        active: activeMembers,
        expired: expiredMembers,
      },
      equipment: {
        total: totalEquipment,
        available: availableEquipment,
        maintenance: maintenanceEquipment,
      },
      payments: {
        totalRevenue: totalRevenue[0]?.total || 0,
        monthlyRevenue: monthlyRevenue[0]?.total || 0,
      },
      workouts: {
        total: totalWorkouts,
        public: publicWorkouts,
      },
      users: {
        total: totalUsers,
        trainers: trainers,
      },
      recentActivity: {
        payments: recentPayments,
        members: recentMembers,
      },
    });
  } catch (error) {
    console.error('Get dashboard error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   GET /api/reports/members
// @desc    Get member reports
// @access  Private
router.get('/members', auth, async (req, res) => {
  try {
    const {startDate, endDate} = req.query;

    const matchQuery = {};
    if (startDate && endDate) {
      matchQuery.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const membersByType = await Member.aggregate([
      {$match: matchQuery},
      {$group: {_id: '$membershipType', count: {$sum: 1}}},
    ]);

    const membersByStatus = await Member.aggregate([
      {$match: matchQuery},
      {$group: {_id: '$membershipStatus', count: {$sum: 1}}},
    ]);

    const newMembers = await Member.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    });

    const membersExpiringSoon = await Member.countDocuments({
      membershipStatus: 'active',
      membershipEndDate: {
        $lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    });

    res.json({
      byType: membersByType,
      byStatus: membersByStatus,
      newMembers,
      membersExpiringSoon,
    });
  } catch (error) {
    console.error('Get member reports error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   GET /api/reports/revenue
// @desc    Get revenue reports
// @access  Private
router.get('/revenue', auth, async (req, res) => {
  try {
    const {startDate, endDate} = req.query;

    const matchQuery = {paymentStatus: 'completed'};
    if (startDate && endDate) {
      matchQuery.paymentDate = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const revenueByMonth = await Payment.aggregate([
      {$match: matchQuery},
      {
        $group: {
          _id: {
            year: {$year: '$paymentDate'},
            month: {$month: '$paymentDate'},
          },
          total: {$sum: '$amount'},
          count: {$sum: 1},
        },
      },
      {$sort: {'_id.year': 1, '_id.month': 1}},
    ]);

    const revenueByType = await Payment.aggregate([
      {$match: matchQuery},
      {
        $group: {
          _id: '$paymentType',
          total: {$sum: '$amount'},
          count: {$sum: 1},
        },
      },
    ]);

    const revenueByMethod = await Payment.aggregate([
      {$match: matchQuery},
      {
        $group: {
          _id: '$paymentMethod',
          total: {$sum: '$amount'},
          count: {$sum: 1},
        },
      },
    ]);

    const totalRevenue = await Payment.aggregate([
      {$match: matchQuery},
      {$group: {_id: null, total: {$sum: '$amount'}, count: {$sum: 1}}},
    ]);

    res.json({
      byMonth: revenueByMonth,
      byType: revenueByType,
      byMethod: revenueByMethod,
      total: totalRevenue[0] || {total: 0, count: 0},
    });
  } catch (error) {
    console.error('Get revenue reports error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   GET /api/reports/attendance
// @desc    Get attendance reports
// @access  Private
router.get('/attendance', auth, async (req, res) => {
  try {
    const {startDate, endDate} = req.query;

    const members = await Member.find({}).select('userId attendance');

    let totalCheckIns = 0;
    const dailyAttendance = {};

    members.forEach(member => {
      member.attendance.forEach(record => {
        const recordDate = new Date(record.date).toISOString().split('T')[0];
        
        if (startDate && endDate) {
          const recordDateObj = new Date(record.date);
          const startDateObj = new Date(startDate);
          const endDateObj = new Date(endDate);
          
          if (recordDateObj >= startDateObj && recordDateObj <= endDateObj) {
            totalCheckIns++;
            dailyAttendance[recordDate] = (dailyAttendance[recordDate] || 0) + 1;
          }
        } else {
          totalCheckIns++;
          dailyAttendance[recordDate] = (dailyAttendance[recordDate] || 0) + 1;
        }
      });
    });

    const sortedDailyAttendance = Object.entries(dailyAttendance)
      .map(([date, count]) => ({date, count}))
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(-30); // Last 30 days

    res.json({
      totalCheckIns,
      dailyAttendance: sortedDailyAttendance,
    });
  } catch (error) {
    console.error('Get attendance reports error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

module.exports = router;
