import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios"; // Import axios to make HTTP requests
import "./createAccountPage.css";

export const CreateAccountPage = () => {
  // State hooks for each input field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form behavior

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Construct the user data
    const userData = {
      name: `${firstName} ${lastName}`,
      email,
      password, // Note: Password is sent over HTTPS
    };

    // Send a POST request to your backend
    try {
      const response = await axios.post("http://localhost:5000/register/add", userData); // Adjust the URL as necessary
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage('Please Sign In. User Already Exists!');

        
      } else {
        console.error("Error creating account:", error);
        setErrorMessage('Error creating Account, Please Try Again Later');
      }
    }
  };

  return (
    <div className="register-account">
      {/* add header/navbar */}
      <div className="sign-up">
        <p className="welcome-to-raise-the">
          <span className="span">Welcome to </span>
          <span className="text-wrapper-3">Raise the Bar</span>
        </p>
        <div className="text-wrapper-4">Sign up</div>
        {/* first name input */}
        <div className="firstname-input">
          <div className="text-wrapper-5">First Name *</div>
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            style={{
              width: "200px",
              fontFamily: "Questrial, sans-serif",
              textTransform: "none",
              top: "33px",
            }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        {/* last name input */}
        <div className="lastname-input">
          <div className="text-wrapper-5">Last Name *</div>
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            style={{
              width: "200px",
              fontFamily: "Questrial, sans-serif",
              textTransform: "none",
              top: "33px",
            }}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        {/* email input */}
        <div className="email-address-input">
          <div className="text-wrapper-7">Enter email address</div>
          <TextField
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            style={{
              width: "400px",
              fontFamily: "Questrial, sans-serif",
              textTransform: "none",
              top: "33px",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* password input and confirmation */}
        <div className="password-input">
          <div className="text-wrapper-7">Enter password</div>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            style={{
              width: "400px",
              fontFamily: "Questrial, sans-serif",
              textTransform: "none",
              top: "33px",
            }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="confirmpassword">
          <div className="text-wrapper-9">Confirm password</div>
          <TextField
            id="outlined-basic"
            label="Confirm Password"
            variant="outlined"
            type="password"
            style={{
              width: "400px",
              fontFamily: "Questrial, sans-serif",
              textTransform: "none",
              top: "33px",
            }}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <Button
          variant="contained"
          style={{
            width: "425px",
            top: "600px",
            left: "48px",
            fontFamily: "Source Sans Pro, monospace",
            textTransform: "none",
          }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
        {errorMessage && <div style={{marginLeft: '45px', marginTop: '525px', marginBottom: '20px', color: 'red' }}>{errorMessage}</div>}
      </div>
    </div>
  );
};

export default CreateAccountPage;
