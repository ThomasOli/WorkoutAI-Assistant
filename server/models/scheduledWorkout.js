const mongoose = require('mongoose');

const ScheduledWorkoutSchema = new mongoose.Schema({
  userId: { type: String, required: true, ref: 'User' }, 
  workoutId: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true },
  scheduledDate: { type: Date, required: true },
  reminder: {
    enabled: { type: Boolean, default: false },
    remindAt: { type: Date },
  },
  reminderSent: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('ScheduledWorkout', ScheduledWorkoutSchema);
