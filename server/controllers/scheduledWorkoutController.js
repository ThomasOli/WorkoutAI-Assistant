const ScheduledWorkout = require('../models/scheduledWorkout');
const User = require('../models/User');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

// Configure nodemailer with an email service provider credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  
// Schedule a new workout
exports.scheduleWorkout = async (req, res) => {
  const { userId, workoutId, scheduledDate } = req.body;

  try {
    // You may want to add validation here to ensure the data is correct
    const newScheduledWorkout = new ScheduledWorkout({
      userId,
      workoutId,
      scheduledDate
    });

    const savedScheduledWorkout = await newScheduledWorkout.save();
    res.status(201).json(savedScheduledWorkout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Set a reminder for a scheduled workout
exports.setReminder = async (req, res) => {
  const { id } = req.params;
  const { remindAt } = req.body;

  try {
    const scheduledWorkout = await ScheduledWorkout.findById(id);
    if (!scheduledWorkout) {
      return res.status(404).json({ message: 'Scheduled workout not found' });
    }

    // Fetch the user's email to send the reminder to
    const user = await User.findById(scheduledWorkout.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the ScheduledWorkout document with reminder information
    scheduledWorkout.reminder.enabled = true;
    scheduledWorkout.reminder.remindAt = remindAt;
    await scheduledWorkout.save();

    // Schedule the reminder email
    const job = cron.schedule(new Date(remindAt).toISOString(), async () => {
       
        const mailOptions = {
            from: process.env.EMAIL_USER, // Use environment variable for sender email
            to: user.email, // User's email
            subject: 'Workout Reminder',
            text: `Just a reminder to complete your workout scheduled for ${scheduledWorkout.scheduledDate}. Go for it!`
          };
          

      try {
        await transporter.sendMail(mailOptions);
        console.log('Reminder email sent successfully.');
      } catch (error) {
        console.error('Failed to send reminder email:', error);
      }
    });

    // Response with the updated ScheduledWorkout
    res.json(scheduledWorkout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};