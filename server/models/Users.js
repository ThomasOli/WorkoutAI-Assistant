const mongoose = require('mongoose');

// Correctly define the schema using mongoose.Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
});

// Create the model from the schema
const UserModel = mongoose.model("users", UserSchema);

// Export the model
module.exports = UserModel;
