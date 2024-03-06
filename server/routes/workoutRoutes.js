const express = require('express');
const router = express.Router();
const { getWorkouts, addWorkout, updateWorkout, deleteWorkout } = require('../controllers/workoutController');

router.get('/', getWorkouts);
router.post('/', addWorkout);
router.put('/:id', updateWorkout);
router.delete('/:id', deleteWorkout);

module.exports = router;
