const mongoose = require('mongoose');

const StretchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  type: {
    type: String,
    enum: ['pre-workout', 'post-workout'],
    required: true
  }
});

module.exports = mongoose.model('Stretch', StretchSchema);