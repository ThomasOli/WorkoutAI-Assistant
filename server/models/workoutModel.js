const mongoose = require('mongoose');
const UserSchema = require('./User'); // Import the User schema

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  timeRep: [Number],
  checked: [Boolean]
});

const WorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference the User model
  workoutName: { type: String, required: true },
  exercises: [ExerciseSchema],
  isFavorite: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Workout', WorkoutSchema);