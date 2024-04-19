const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    timeRep: [Number],
    checked: [Boolean]
});

const WorkoutSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    workoutName: { type: String, required: true },
    exercises: [ExerciseSchema],
    isFavorite: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Workout', WorkoutSchema);
