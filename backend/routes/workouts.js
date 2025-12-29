const express = require('express');
const jwt = require('jsonwebtoken');
const Workout = require('../models/Workout');

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

// @route   GET /api/workouts
// @desc    Get all workouts
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const {type, difficulty, isPublic} = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (difficulty) filter.difficulty = difficulty;
    if (isPublic !== undefined) filter.isPublic = isPublic === 'true';

    const workouts = await Workout.find(filter)
      .populate('createdBy', 'name email')
      .populate('equipmentNeeded')
      .populate('assignedTo')
      .sort({createdAt: -1});

    res.json(workouts);
  } catch (error) {
    console.error('Get workouts error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   GET /api/workouts/:id
// @desc    Get workout by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('equipmentNeeded')
      .populate('assignedTo');

    if (!workout) {
      return res.status(404).json({message: 'Workout not found'});
    }

    res.json(workout);
  } catch (error) {
    console.error('Get workout error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   POST /api/workouts
// @desc    Create new workout
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const {
      name,
      type,
      description,
      duration,
      difficulty,
      exercises,
      equipmentNeeded,
      assignedTo,
      caloriesBurned,
      tags,
      imageUrl,
      isPublic,
    } = req.body;

    const workout = new Workout({
      name,
      type,
      description,
      duration,
      difficulty,
      exercises,
      equipmentNeeded,
      createdBy: req.user.userId,
      assignedTo,
      caloriesBurned,
      tags,
      imageUrl,
      isPublic,
    });

    await workout.save();
    await workout.populate('createdBy', 'name email');
    await workout.populate('equipmentNeeded');

    res.status(201).json(workout);
  } catch (error) {
    console.error('Create workout error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   PUT /api/workouts/:id
// @desc    Update workout
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({message: 'Workout not found'});
    }

    const {
      name,
      type,
      description,
      duration,
      difficulty,
      exercises,
      equipmentNeeded,
      assignedTo,
      caloriesBurned,
      tags,
      imageUrl,
      isPublic,
    } = req.body;

    if (name) workout.name = name;
    if (type) workout.type = type;
    if (description !== undefined) workout.description = description;
    if (duration) workout.duration = duration;
    if (difficulty) workout.difficulty = difficulty;
    if (exercises) workout.exercises = exercises;
    if (equipmentNeeded) workout.equipmentNeeded = equipmentNeeded;
    if (assignedTo) workout.assignedTo = assignedTo;
    if (caloriesBurned !== undefined) workout.caloriesBurned = caloriesBurned;
    if (tags) workout.tags = tags;
    if (imageUrl !== undefined) workout.imageUrl = imageUrl;
    if (isPublic !== undefined) workout.isPublic = isPublic;

    await workout.save();
    await workout.populate('createdBy', 'name email');
    await workout.populate('equipmentNeeded');

    res.json(workout);
  } catch (error) {
    console.error('Update workout error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   DELETE /api/workouts/:id
// @desc    Delete workout
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({message: 'Workout not found'});
    }

    await Workout.findByIdAndDelete(req.params.id);

    res.json({message: 'Workout deleted successfully'});
  } catch (error) {
    console.error('Delete workout error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   POST /api/workouts/:id/assign/:memberId
// @desc    Assign workout to member
// @access  Private
router.post('/:id/assign/:memberId', auth, async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({message: 'Workout not found'});
    }

    if (!workout.assignedTo.includes(req.params.memberId)) {
      workout.assignedTo.push(req.params.memberId);
    }

    await workout.save();
    await workout.populate('assignedTo');

    res.json(workout);
  } catch (error) {
    console.error('Assign workout error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

module.exports = router;
