const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  memberId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: 0,
  },
  currency: {
    type: String,
    default: 'USD',
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card', 'bank_transfer', 'online', 'other'],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending',
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
  paymentType: {
    type: String,
    enum: ['membership', 'personal_training', 'equipment_rental', 'other'],
    required: true,
  },
  membershipType: {
    type: String,
    enum: ['basic', 'standard', 'premium', 'vip'],
  },
  period: {
    startDate: Date,
    endDate: Date,
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true,
  },
  receiptNumber: {
    type: String,
    unique: true,
    sparse: true,
  },
  notes: {
    type: String,
    default: '',
  },
  processedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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
paymentSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

// Generate receipt number before saving
paymentSchema.pre('save', async function (next) {
  if (!this.receiptNumber) {
    const count = await this.constructor.countDocuments();
    this.receiptNumber = `GYM-${Date.now()}-${count + 1}`;
  }
  next();
});

module.exports = mongoose.model('Payment', paymentSchema);
