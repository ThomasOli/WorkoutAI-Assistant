const express = require('express');
const Workout = require('../models/workoutModel');
const mongoose = require('mongoose'); 

// Controller to get workouts
exports.getWorkouts = async (req, res) => {
    try {
        const { userId } = req.query;
        if (!userId) {
            return res.status(400).json({ message: "userId parameter is required." });
        }
        console.log("UserId for getWorkouts:", userId);

        // Ensure the correct collection and database is targeted
        const workouts = await Workout.find({ userId }).sort({ date: -1 });

        console.log("Workouts fetched:", workouts);
        res.json(workouts);
    } catch (err) {
        console.error("Error when retrieving workouts:", err);
        res.status(500).json({ message: err.message });
    }
};

// Controller to add a new workout
exports.addWorkout = async (req, res) => {
  try {
    const { userId, ...workoutData } = req.body;
    const newWorkout = new Workout({
      userId: mongoose.Types.ObjectId(userId),
      ...workoutData,
    });
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

exports.markComplete = async (req, res) => {
    try {
      const workoutId = req.params.id;
      const workout = await Workout.findByIdAndUpdate(workoutId, { completed: true }, { new: true });
      res.json(workout);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.getCompletedWorkouts = async (req, res) => {
    try {
      const { userId } = req.query; // Assume a user ID is passed as a query parameter
      const completedWorkouts = await Workout.find({ userId, completed: true });
      res.json(completedWorkouts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  
  exports.addExerciseToWorkout = async (req, res) => {
    try {
      const { workoutId } = req.params;
      const { name, timeRep, checked } = req.body;
  
      const workout = await Workout.findById(workoutId);
      if (!workout) {
        return res.status(404).json({ message: "Workout not found" });
      }
  
      const newExercise = {
        name,
        timeRep,
        checked,
      };
  
      workout.exercises.push(newExercise);
      const updatedWorkout = await workout.save();
  
      res.json(updatedWorkout);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };