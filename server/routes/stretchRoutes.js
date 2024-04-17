const express = require('express');
const router = express.Router();
const Stretch = require('../models/Stretch');

// Get all stretches
router.get('/', async (req, res) => {
  const type = req.query.type;  // Optionally filter by type
  try {
    const conditions = type ? { type } : {};
    const stretches = await Stretch.find(conditions);
    res.json(stretches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post a new stretch
router.post('/', async (req, res) => {
  const { name, description, duration, type } = req.body;
  const stretch = new Stretch({
    name,
    description,
    duration,
    type
  });
  try {
    const newStretch = await stretch.save();
    res.status(201).json(newStretch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;