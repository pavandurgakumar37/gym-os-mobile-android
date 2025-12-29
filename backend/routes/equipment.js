const express = require('express');
const jwt = require('jsonwebtoken');
const Equipment = require('../models/Equipment');

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

// @route   GET /api/equipment
// @desc    Get all equipment
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const {category, status, condition} = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (condition) filter.currentCondition = condition;

    const equipment = await Equipment.find(filter).sort({createdAt: -1});

    res.json(equipment);
  } catch (error) {
    console.error('Get equipment error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   GET /api/equipment/:id
// @desc    Get equipment by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({message: 'Equipment not found'});
    }

    res.json(equipment);
  } catch (error) {
    console.error('Get equipment error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   POST /api/equipment
// @desc    Create new equipment
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const {
      name,
      category,
      brand,
      model,
      serialNumber,
      purchaseDate,
      purchasePrice,
      currentCondition,
      status,
      location,
      lastMaintenanceDate,
      nextMaintenanceDate,
      maintenanceNotes,
      imageUrl,
    } = req.body;

    const equipment = new Equipment({
      name,
      category,
      brand,
      model,
      serialNumber,
      purchaseDate,
      purchasePrice,
      currentCondition,
      status,
      location,
      lastMaintenanceDate,
      nextMaintenanceDate,
      maintenanceNotes,
      imageUrl,
    });

    await equipment.save();

    res.status(201).json(equipment);
  } catch (error) {
    console.error('Create equipment error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   PUT /api/equipment/:id
// @desc    Update equipment
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({message: 'Equipment not found'});
    }

    const {
      name,
      category,
      brand,
      model,
      serialNumber,
      purchaseDate,
      purchasePrice,
      currentCondition,
      status,
      location,
      lastMaintenanceDate,
      nextMaintenanceDate,
      maintenanceNotes,
      imageUrl,
    } = req.body;

    if (name) equipment.name = name;
    if (category) equipment.category = category;
    if (brand !== undefined) equipment.brand = brand;
    if (model !== undefined) equipment.model = model;
    if (serialNumber !== undefined) equipment.serialNumber = serialNumber;
    if (purchaseDate !== undefined) equipment.purchaseDate = purchaseDate;
    if (purchasePrice !== undefined) equipment.purchasePrice = purchasePrice;
    if (currentCondition) equipment.currentCondition = currentCondition;
    if (status) equipment.status = status;
    if (location !== undefined) equipment.location = location;
    if (lastMaintenanceDate !== undefined)
      equipment.lastMaintenanceDate = lastMaintenanceDate;
    if (nextMaintenanceDate !== undefined)
      equipment.nextMaintenanceDate = nextMaintenanceDate;
    if (maintenanceNotes !== undefined) equipment.maintenanceNotes = maintenanceNotes;
    if (imageUrl !== undefined) equipment.imageUrl = imageUrl;

    await equipment.save();

    res.json(equipment);
  } catch (error) {
    console.error('Update equipment error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   DELETE /api/equipment/:id
// @desc    Delete equipment
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);

    if (!equipment) {
      return res.status(404).json({message: 'Equipment not found'});
    }

    await Equipment.findByIdAndDelete(req.params.id);

    res.json({message: 'Equipment deleted successfully'});
  } catch (error) {
    console.error('Delete equipment error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

// @route   GET /api/equipment/stats/summary
// @desc    Get equipment statistics
// @access  Private
router.get('/stats/summary', auth, async (req, res) => {
  try {
    const total = await Equipment.countDocuments();
    const available = await Equipment.countDocuments({status: 'available'});
    const inUse = await Equipment.countDocuments({status: 'in_use'});
    const maintenance = await Equipment.countDocuments({status: 'maintenance'});
    const outOfService = await Equipment.countDocuments({status: 'out_of_service'});

    const byCategory = await Equipment.aggregate([
      {$group: {_id: '$category', count: {$sum: 1}}},
    ]);

    const byCondition = await Equipment.aggregate([
      {$group: {_id: '$currentCondition', count: {$sum: 1}}},
    ]);

    res.json({
      total,
      available,
      inUse,
      maintenance,
      outOfService,
      byCategory,
      byCondition,
    });
  } catch (error) {
    console.error('Get equipment stats error:', error);
    res.status(500).json({message: 'Server error', error: error.message});
  }
});

module.exports = router;
