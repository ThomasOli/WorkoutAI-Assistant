import { Button, TextField } from '@mui/material';
import React from 'react';
import './createAccountPage.css'

export const CreateAccountPage = () => {
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
            <TextField id="outlined-basic" label="First Name" variant="outlined" style={{width: '200px', fontFamily: 'Questrial, sans-serif', textTransform: 'none', top: '33px'}}/>
          </div>
          {/* last name input */}
          <div className="lastname-input">
            <div className="text-wrapper-5">Last Name *</div>
            <TextField id="outlined-basic" label="Last Name" variant="outlined" style={{width: '200px', fontFamily: 'Questrial, sans-serif', textTransform: 'none', top: '33px'}}/>
          </div>
          {/* email input */}
          <div className="email-address-input">
            <div className="text-wrapper-7">Enter email address</div>
            <TextField id="outlined-basic" label="Email Address" variant="outlined" style={{width: '400px', fontFamily: 'Questrial, sans-serif', textTransform: 'none',  top: '33px'}}/>
          </div>
          {/* password input and confirmation */}
          <div className="password-input">
            <div className="text-wrapper-7">Enter password</div>
            <TextField id="outlined-basic" label="Password" variant="outlined" style={{width: '400px', fontFamily: 'Questrial, sans-serif', textTransform: 'none',  top: '33px'}}/>
          </div>
          <div className="confirmpassword">
            <div className="text-wrapper-9">Confirm password</div>
            <TextField id="outlined-basic" label="Confirm Password" variant="outlined" style={{width: '400px', fontFamily: 'Questrial, sans-serif', textTransform: 'none',  top: '33px'}}/>
          </div>
          <Button variant="contained" style={{
                width: '425px', 
                top: '600px', 
                left: '48px', 
                fontFamily: 'Source Sans Pro, monospace', 
                textTransform: 'none'}}>
                  Sign Up
        </Button>
      </div>
    </div>
  )
}

export default CreateAccountPage;