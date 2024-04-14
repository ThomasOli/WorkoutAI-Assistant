const express = require("express");
const recordRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

<<<<<<< HEAD
recordRoutes.route("/record").get(function (req, res) {
  let db_connect = dbo.getDb();
  db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

 
// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("records")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   name: req.body.name,
   position: req.body.position,
   level: req.body.level,
 };
 db_connect.collection("records").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
     name: req.body.name,
     position: req.body.position,
     level: req.body.level,
   },
 };
 db_connect
   .collection("records")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("records").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;
=======
recordRoutes.route("/record/add").post(async (req, response) => {
  try {
    const db = await dbo.getDb();
    const { userID, workoutName, exercises } = req.body;

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
    }
  } catch (error) {
    console.error("Error inserting new workout:", error);
    response.status(500).json({ error: "Internal server error" });
  }
});
module.exports = recordRoutes;
>>>>>>> 934f6093172a8c6505d60c97ff20a7eba713543b
