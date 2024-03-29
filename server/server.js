
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

// Adjust the route to include password hashing

// passport.use(new GoogleStrategy({
//   clientID: '434264571626-bcvfo0ftpcjollu8b8e9vlbecsn8pub8.apps.googleusercontent.com',
//   clientSecret: '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', 
//   callbackURL: '/auth/google/callback'
// },
//   (accessToken, refreshToken, profile, done) => {
//       const user = {
//         username:profile.name,
//       }
//       console.log(profile);
//       done(null, profile);
//   }));
// // Set up session and Passport
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
