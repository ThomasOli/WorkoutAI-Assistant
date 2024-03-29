const express = require('express');
const router = express.Router();
const workoutController = require('../controllers/workoutController');

router.get('/', workoutController.getWorkouts);
router.post('/', workoutController.addWorkout);
router.put('/:id', workoutController.updateWorkout);
router.delete('/:id', workoutController.deleteWorkout);

// Add these lines within the module.exports block
router.put('/:id/complete', workoutController.markComplete);
router.get('/completed', workoutController.getCompletedWorkouts);

module.exports = router;
