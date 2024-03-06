require('dotenv').config({ path: './config.env' });
const express = require("express");
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workoutRoutes');
const recordRoutes = require('./routes/record');
const app = express();
const cors = require("cors");

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB with Mongoose
mongoose.connect(process.env.ATLAS_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    
    // Mount workoutRoutes to the '/api/workouts' base path
    app.use('/api/workouts', workoutRoutes);

    // Mount recordRoutes to the '/api/record' base path
    app.use('/api', recordRoutes); // This will prefix '/record' from recordRoutes.js

    // Start listening for requests after a successful database connection
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => {
    console.error('Connection error', err.message);
  });
