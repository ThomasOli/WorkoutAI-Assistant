const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/record/add").post(async (req, response) => {
  try {
    const db = await dbo.getDb();
    const { userID, workoutName, exercises } = req.body;

<<<<<<< Updated upstream
    // Create a new workout document
=======
    // Check if the session ID is present in the cookies
    if (!req.cookies || !req.cookies.sessionId) {
      return response.status(401).json({ message: "No session ID found in cookies." });
    }

    // Retrieve the session ID from cookies
    const sessionId = req.cookies.sessionId;

    // Find the user associated with this session ID
    const user = await db.users.findOne({ sessionId: sessionId });

    // If user is not found, respond with unauthorized
    if (!user) {
      return response.status(401).json({ message: "Unauthorized - No user found with this session ID." });
    }

    // Create the new workout object based on the provided details
>>>>>>> Stashed changes
    const newWorkout = {
      date: new Date(),
      name: workoutName,
      userID: ObjectId(userID),
      favorited: false,
      completed: Array(exercises.length).fill(false),
      exercises: exercises // Array of exercises
    };
    
    // Check if a workout name is provided
    if (workoutName !== "") {
      // Insert the new workout into the database
      const result = await db.collection("workouts").insertOne(newWorkout);
      // Respond with the success message and details of the inserted workout
      response.status(201).json({ message: "Workout added successfully", workoutId: result.insertedId });
<<<<<<< Updated upstream
    }
=======
    } else {
      // Respond with an error message if no workout name is provided
      response.status(400).json({ message: "Workout name is required." });
    } 
>>>>>>> Stashed changes
  } catch (error) {
    console.error("Error inserting new workout:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
module.exports = recordRoutes;