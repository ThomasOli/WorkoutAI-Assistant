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

    const user = await User.findById(scheduledWorkout.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    scheduledWorkout.reminder.enabled = true;
    scheduledWorkout.reminder.remindAt = remindAt;
    await scheduledWorkout.save();

    // Calculate hours left until the scheduled workout
    const hoursLeft = Math.ceil((new Date(scheduledWorkout.scheduledDate) - new Date(remindAt)) / 3600000);

    const message = hoursLeft > 0
      ? `Don't forget to exercise in ${hoursLeft} hours!`
      : "It's time for your scheduled workout. Go for it!";

    // Schedule the reminder email
    const job = cron.schedule(new Date(remindAt).toISOString(), async () => {
      const mailOptions = {
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: 'Workout Reminder',
          text: message
      };

      try {
        await transporter.sendMail(mailOptions);
        console.log('Reminder email sent successfully.');
      } catch (error) {
        console.error('Failed to send reminder email:', error);
      }
    });

    res.json(scheduledWorkout);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
