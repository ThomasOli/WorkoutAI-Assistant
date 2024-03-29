
const express = require("express");
const passport = require('passport');
const app = express();
const cors = require("cors");
const session = require('express-session');

require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/register"));

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


app.listen(port, () => {
  // Perform a database connection when the server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
  });
  console.log(`Server is running on port: ${port}`);
});
