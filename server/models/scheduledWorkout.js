const mongoose = require('mongoose');

const ScheduledWorkoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  workoutId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true },
  scheduledDate: { type: Date, required: true },
  reminder: {
    enabled: { type: Boolean, default: false },
    remindAt: { type: Date }, // Set this to the date and time when the user wants to be reminded
  },
  reminderSent: { type: Boolean, default: false } // Indicates whether a reminder has been sent
}, { timestamps: true });

module.exports = mongoose.model('ScheduledWorkout', ScheduledWorkoutSchema);
