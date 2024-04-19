const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

recordRoutes.route("/record/add").post(async (req, response) => {
  try {
    const db = await dbo.getDb();
    const { userID, workoutName, exercises } = req.body;

    
      const sessionId = req.cookies.sessionId; // assuming you're using cookies for session management
      const user = await db.users.findOne({ sessionId: sessionId });
  
      if (user) {
          req.user = user;
          next();
      
  
    // Create a new workout document
    const newWorkout = {
      date: new Date(),
      name: workoutName,
      userID: userID,
      favorited: false,
      completed: false,
      exercises: exercises // Array of exercises
    };

    // Insert the new workout document into the database
    if (workoutName !== "") {
      const result = await db.collection("workouts").insertOne(newWorkout);
      response.status(201).json({ message: "Workout added successfully", workoutId: result.insertedId });
    }}

    else {
      res.status(401).json({ message: 'Unauthorized' });
  }
  } catch (error) {
    console.error("Error inserting new workout:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});
module.exports = recordRoutes;
