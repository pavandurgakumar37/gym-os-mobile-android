const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Equipment name is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'cardio',
      'strength',
      'flexibility',
      'weights',
      'accessories',
      'other',
    ],
  },
  brand: {
    type: String,
    trim: true,
  },
  model: {
    type: String,
    trim: true,
  },
  serialNumber: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  purchaseDate: {
    type: Date,
  },
  purchasePrice: {
    type: Number,
    min: 0,
  },
  currentCondition: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor', 'maintenance_needed'],
    default: 'good',
  },
  status: {
    type: String,
    enum: ['available', 'in_use', 'maintenance', 'out_of_service'],
    default: 'available',
  },
  location: {
    type: String,
    trim: true,
  },
  lastMaintenanceDate: {
    type: Date,
  },
  nextMaintenanceDate: {
    type: Date,
  },
  maintenanceNotes: {
    type: String,
    default: '',
  },
  imageUrl: {
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
equipmentSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Equipment', equipmentSchema);
