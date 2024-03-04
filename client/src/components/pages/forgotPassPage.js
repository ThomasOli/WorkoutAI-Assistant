import { Button, TextField } from '@mui/material';
import React from 'react'
import './forgotPassPage.css'

export const ForgotPassPage = () => {
  // will need to figure out state change for when they hit enter
  // if email exists in database, send code then ask for input
    // once correct code, then allow them to update password and login
  // if email doesn't exist, change card to say 'email does not exist in our database'
  return (
    <div className="forgot-password">
        {/* add a header/navbar */}
        <div className="log-in-card">
          <div className="overlap">
            <div className="text-wrapper">Reset Password</div>
            <p className="p">If you have forgotten your password, you may request a new password by email</p>
          </div>
          <div className="email-address-input">
            <div className="text-wrapper-2">Enter email address</div>
            <TextField id="outlined-basic" label="Email Address" variant="outlined" style={{width: '425px', fontFamily: 'Questrial, sans-serif', textTransform: 'none'}} />
          </div>
          <Button variant="contained" style={{
                top: '350px', 
                left: '59px', 
                width: '400px', 
                fontFamily: 'Questrial, sans-serif', 
                alignSelf: 'center',
                textTransform: 'none', 
                fontSize: '20px'}}> 
                Reset Password
            </Button>
        </div>
    </div>
  )
}

export default ForgotPassPage;