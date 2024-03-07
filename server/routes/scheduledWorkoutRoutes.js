const express = require('express');
const router = express.Router();
const scheduledWorkoutController = require('../controllers/scheduledWorkoutController');

// Endpoint to schedule a workout
router.post('/schedule', scheduledWorkoutController.scheduleWorkout);

// Endpoint to set a reminder for a scheduled workout
router.post('/schedule/:id/remind', scheduledWorkoutController.setReminder);

module.exports = router;