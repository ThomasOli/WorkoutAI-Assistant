const passport = require('passport');
const session = require('express-session');
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
<<<<<<< HEAD
=======
const scheduledWorkoutRoutes = require('./routes/scheduledWorkoutRoutes');


>>>>>>> 934f6093172a8c6505d60c97ff20a7eba713543b
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(require("./routes/register"));
app.use(require("./routes/record"));

// Get driver connection
const dbo = require("./db/conn");


app.use(session({
  secret: 'your_secret_key',  // Replace with a strong secret key
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// Define routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
      // Redirect after successful authentication
      res.redirect('/dashboard');
  }
);
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


// Connect to MongoDB with Mongoose
mongoose.connect(process.env.ATLAS_URI)
  .then(() => {
    
    // Mount various routes
    app.use('/api/workouts', workoutRoutes); // Workout routes
    app.use('/api/record', recordRoutes); // Record routes
    app.use('/api/workouts', scheduledWorkoutRoutes); // Scheduled workout routes
    app.use('/api/stretches', stretchRoutes); // Stretch routes

    // Start listening for requests after a successful database connection
    app.listen(port, () => {
      dbo.connectToServer(function (err) {
        if (err) console.error(err);
      });
      console.log(`Server is running on port: ${port}`);
    });
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
<<<<<<< HEAD
});



=======
  
  cron.schedule('* * * * *', async () => {
    try {
      const now = new Date();
      const reminders = await ScheduledWorkout.find({
        'reminder.enabled': true,
        'reminder.remindAt': { $lte: now },
        'reminderSent': { $ne: true }
      });
  
      reminders.forEach(async (reminder) => {
        // Construct the email
        const mailOptions = {
          from: process.env.EMAIL_USER, // Use environment variable for sender email
          to: user.email, // User's email
          subject: 'Workout Reminder',
          text: `Just a reminder to complete your workout scheduled for ${scheduledWorkout.scheduledDate}. Go for it!`
        };        
  
        // Send the email
        await transporter.sendMail(mailOptions);
  
        // Update reminder to mark it as sent
        await ScheduledWorkout.findByIdAndUpdate(reminder._id, { 'reminder.reminderSent': true }).exec();
      });
    } catch (error) {
      console.error('Error running reminder cron job:', error);
    }
  });
>>>>>>> 934f6093172a8c6505d60c97ff20a7eba713543b
