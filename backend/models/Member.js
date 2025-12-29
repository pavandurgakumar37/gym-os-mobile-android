const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  membershipType: {
    type: String,
    enum: ['basic', 'standard', 'premium', 'vip'],
    default: 'basic',
  },
  membershipStartDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  membershipEndDate: {
    type: Date,
    required: true,
  },
  membershipStatus: {
    type: String,
    enum: ['active', 'expired', 'suspended', 'pending'],
    default: 'active',
  },
  personalDetails: {
    dateOfBirth: Date,
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    address: String,
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String,
    },
  },
  fitnessGoals: {
    type: [String],
    default: [],
  },
  healthConditions: {
    type: String,
    default: '',
  },
  assignedTrainer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  attendance: [
    {
      date: Date,
      checkIn: String,
      checkOut: String,
    },
  ],
  payments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Payment',
    },
  ],
  workouts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workout',
    },
  ],
  notes: {
    type: String,
    default: '',
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
memberSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual to check if membership is active
memberSchema.virtual('isActive').get(function () {
  return (
    this.membershipStatus === 'active' &&
    new Date(this.membershipEndDate) > new Date()
  );
});

// Ensure virtuals are included in JSON
memberSchema.set('toJSON', {virtuals: true});
memberSchema.set('toObject', {virtuals: true});

module.exports = mongoose.model('Member', memberSchema);
