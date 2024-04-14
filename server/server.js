require('dotenv').config({ path: './config.env' });
const express = require("express");
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workoutRoutes');
const recordRoutes = require('./routes/record');
const scheduledWorkoutRoutes = require('./routes/scheduledWorkoutRoutes');
const stretchRoutes = require('./routes/stretchRoutes'); 
const app = express();
const cors = require("cors");
const cron = require('node-cron');
const nodemailer = require('nodemailer');
const ScheduledWorkout = require('./models/scheduledWorkout');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB with Mongoose
mongoose.connect(process.env.ATLAS_URI)
  .then(() => {
    console.log('Successfully connected to MongoDB.');
    
    // Mount various routes
    app.use('/api/workouts', workoutRoutes); // Workout routes
    app.use('/api/record', recordRoutes); // Record routes
    app.use('/api/workouts', scheduledWorkoutRoutes); // Scheduled workout routes
    app.use('/api/stretches', stretchRoutes); // Stretch routes

    // Start listening for requests after a successful database connection
    app.listen(port, () => console.log(`Server running on port ${port}`));
  })
  .catch(err => {
    console.error('Connection error', err.message);
  });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Test email endpoint
app.post('/api/test-email', (req, res) => {
  const { to, subject, text } = req.body;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: text
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ message: 'Error sending email', error: error });
    } else {
      console.log('Email sent:', info.response);
      res.status(200).json({ message: 'Email sent successfully', response: info.response });
    }
  });
});

cron.schedule('* * * * *', async () => {
  const now = new Date();
  const reminders = await ScheduledWorkout.find({
    'reminder.enabled': true,
    'reminder.remindAt': { $lte: now },
    'reminderSent': { $ne: true }
  });
  reminders.forEach(async (reminder) => {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Workout Reminder',
      text: `Just a reminder to complete your workout scheduled for ${reminder.scheduledDate}. Go for it!`
    };
    await transporter.sendMail(mailOptions);
    await ScheduledWorkout.findByIdAndUpdate(reminder._id, { 'reminder.reminderSent': true }).exec();
  });
});



