import { Button, TextField } from '@mui/material';
import React, {useState} from 'react';
import './createAccountPage.css'
import { useNavigate } from 'react-router-dom';

export const CreateAccountPage = () => {
  const [firstName, setFirstName] = useState('');
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
    console.log(firstName);
  };
  const [lastName, setLastName] = useState('');
  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
    console.log(lastName);
  };
  const [email, setemail] = useState('');
  const handleEmailChange = (event) => {
    setemail(event.target.value);
    console.log(email);
  };
  const [password, setPassword] = useState('');
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };
  const [confirmPass, setConfirmPass] = useState('');
  const handleConfirmPassChange = (event) => {
    setConfirmPass(event.target.value);
    console.log(confirmPass);
  };
  const navigate = useNavigate;
  const handleCreateAccount = () => {
    // send variables to backend database
    // once verified send them to their home page
    const id = 1;
    navigate('/home/:' + id);
  };
  const [formValid, setFormValid] = useState(false);
  const checkFormValidity = () => {
    // Check if all required fields are filled out
    const fieldsFilled = firstName !== '' && lastName !== '' && email.trim() !== '' && password !== '' && confirmPass !== '';

    // Check if passwords match
    const passwordsMatch = password === confirmPass;

    // Set the overall form validity
    setFormValid(fieldsFilled && passwordsMatch);
  };

  // Update form validity whenever any input changes
  React.useEffect(() => {
    checkFormValidity();
  }, [firstName, lastName, email, password, confirmPass]);

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
            <TextField id="outlined-basic" label="First Name" variant="outlined" 
              style={{width: '200px', fontFamily: 'Questrial, sans-serif', textTransform: 'none', top: '33px'}}
              value={firstName}
              onChange={handleFirstNameChange}/>
          </div>
          {/* last name input */}
          <div className="lastname-input">
            <div className="text-wrapper-5">Last Name *</div>
            <TextField id="outlined-basic" label="Last Name" variant="outlined" 
              style={{width: '200px', fontFamily: 'Questrial, sans-serif', textTransform: 'none', top: '33px'}}
              value={lastName}
              onChange={handleLastNameChange}/>
          </div>
          {/* email input */}
          <div className="email-address-input">
            <div className="text-wrapper-7">Enter email address</div>
            <TextField id="outlined-basic" label="Email Address" variant="outlined" 
              style={{width: '400px', fontFamily: 'Questrial, sans-serif', textTransform: 'none',  top: '33px'}}
              value={email}
              onChange={handleEmailChange}/>
          </div>
          {/* password input and confirmation */}
          <div className="password-input">
            <div className="text-wrapper-7">Enter password</div>
            <TextField id="outlined-basic" label="Password" variant="outlined" 
              style={{width: '400px', fontFamily: 'Questrial, sans-serif', textTransform: 'none',  top: '33px'}}
              value={password}
              onChange={handlePasswordChange}/>
          </div>
          <div className="confirmpassword">
            <div className="text-wrapper-9">Confirm password</div>
            <TextField id="outlined-basic" label="Confirm Password" variant="outlined" 
              style={{width: '400px', fontFamily: 'Questrial, sans-serif', textTransform: 'none',  top: '33px'}}
              value={confirmPass}
              onChange={handleConfirmPassChange}/>
          </div>
          <Button variant="contained" style={{
                width: '425px', 
                top: '600px', 
                left: '48px', 
                fontFamily: 'Source Sans Pro, monospace', 
                textTransform: 'none'}}
                onClick={handleCreateAccount}
                disabled={!formValid}>
                  Sign Up
        </Button>
      </div>
    </div>
  )
}

export default CreateAccountPage;