// Import the Workout model
const Workout = require('../models/workoutModel');

// Controller to get all workouts for a user
exports.getWorkouts = async (req, res) => {
  try {
    // Assume a user ID is being passed as a query parameter
    const { userId } = req.query;
    const workouts = await Workout.find({ userId }).sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller to add a new workout
exports.addWorkout = async (req, res) => {
  try {
    const newWorkout = new Workout(req.body);
    const savedWorkout = await newWorkout.save();
    res.status(201).json(savedWorkout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller to update a workout
exports.updateWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json(updatedWorkout);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller to delete a workout
exports.deleteWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWorkout = await Workout.findByIdAndDelete(id);
    if (!deletedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.json({ message: "Workout deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
