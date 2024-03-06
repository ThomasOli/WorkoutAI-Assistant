const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, required: true },
  exercises: [{
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number },
  }],
  notes: String
}, { timestamps: true });

module.exports = mongoose.model('Workout', WorkoutSchema);
