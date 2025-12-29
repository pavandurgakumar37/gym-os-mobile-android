const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Workout name is required'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'Workout type is required'],
    enum: ['cardio', 'strength', 'flexibility', 'hiit', 'yoga', 'crossfit', 'other'],
  },
  description: {
    type: String,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'Duration is required'],
    min: 1,
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate',
  },
  exercises: [
    {
      name: {
        type: String,
        required: true,
      },
      sets: {
        type: Number,
        default: 3,
      },
      reps: {
        type: Number,
      },
      duration: {
        type: Number,
      },
      weight: {
        type: Number,
      },
      restTime: {
        type: Number,
        default: 60,
      },
      notes: String,
    },
  ],
  equipmentNeeded: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Equipment',
    },
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  assignedTo: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Member',
    },
  ],
  caloriesBurned: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    default: [],
  },
  imageUrl: {
    type: String,
    default: '',
  },
  isPublic: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
workoutSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Workout', workoutSchema);
