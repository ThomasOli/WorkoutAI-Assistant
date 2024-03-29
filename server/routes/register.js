const express = require("express");
const bcrypt = require("bcrypt");
const registerRoutes = express.Router();
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

// Assuming UserModel is your mongoose model for Users

// Register new user with hashed password
registerRoutes.route("/register/add").post(async (req, response) => {
  let db_connect = dbo.getDb();
  const { email, password, ...otherDetails } = req.body;

  // First, check if the email is already registered
  const userExists = await db_connect.collection("register").findOne({ email: email });
  if (userExists) {
    response.status(400).json({ error: "Email is already registered" });
    return;
  }

  // Proceed with hashing the password if email is not registered
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      response.status(500).json({ error: "Error hashing password" });
      return;
    }

    let myobj = {
      email,
      ...otherDetails,
      password: hashedPassword,
    };

    db_connect.collection("register").insertOne(myobj, (err, res) => {
      if (err) {
        response.status(500).json({ error: "Error registering new user" });
        return;
      }
      response.status(201).json({ message: "User registered successfully", userId: res.insertedId });
    });
  });
});

// Login
registerRoutes.route("/login").post(async (req, res) => {
  const { email, password } = req.body;
  let db_connect = dbo.getDb();

  try {
    const user = await db_connect.collection("register").findOne({ email: email });
    if (!user) {
      // Use a generic error message for both missing user and incorrect password
      res.status(401).json({ error: "Incorrect email or password" });
      return;
    }

    // Compare submitted password with hashed password in db
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // Passwords match
      // Remove sensitive fields before sending the user information
      const { password, ...userInfoWithoutPassword } = user;
      res.json({ message: "Success", user: userInfoWithoutPassword });
    } else {
      // Passwords don't match
      res.status(401).json({ error: "Incorrect email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error logging in user" });
  }
});

module.exports = registerRoutes;
