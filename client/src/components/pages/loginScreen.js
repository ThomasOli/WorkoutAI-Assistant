import React, { useState } from "react";
import axios from "axios";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate, Link } from "react-router-dom";
import "./loginScreen.css";
import glassFrameBackground from '../images/glassFrameBackground.png'

export const LogInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      
      const res = await axios.post('http://localhost:5000/login', { email, password });
      console.log(res.data);
      navigate('/home/:1'); // Adjust as necessary
    } catch (error) {
      setErrorMessage('Incorrect Combination, Please Try Again');
    }

  };

  return (
    <div className="log-in-screen">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group">
            <img className="color-block-frame" alt="Color block frame" src={glassFrameBackground} />
            <div className="sign-in-title">
              <p className="p">Simplifying and Improving your physical life, one rep at a time.</p>
              <div className="sign-in-to">
                <div className="overlap-group-2">
                  <div className="text-wrapper-6">Sign in to</div>
                  <div className="text-wrapper-7">Raise the Bar</div>
                </div>
              </div>
            </div>
            <div className="register-here-text">
              <div className="overlap-2">
                <p className="text-wrapper-8">If you don’t have an account register</p>
                <p className="you-can-register">
                  <span className="span">You can</span>


                  <Button variant='text' style={{
                    fontFamily: 'Hind Vadodara, sans-serif', 
                    textTransform: 'none', 
                    fontSize: '20px', 
                    fontWeight: '400',
                    height: '20px',
                    width: '145px',
                    top: '-2px'}}
                    component={Link} to='/createAccount'> 
                      Register Here!
                  </Button>
                  <span className="span">!</span>
                </p>
              </div>
            </div>
            <div className="log-in-card">

              <form onSubmit={handleLogin}>
                <div className="overlap-3">
                  <p className="welcome-to-app">
                    <span className="text-wrapper-10">Welcome to </span>
                    <span className="text-wrapper-11">Raise the Bar</span>
                  </p>
                  <div className="text-wrapper-12">Sign in</div>
                </div>
                <div className="email-address-input">
                  <div className="text-wrapper-13">Enter email address</div>
                  <div className="overlap-group-wrapper">
                    <div className="div-wrapper">
                      <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" style={{width: '425px', fontFamily: 'Questrial, sans-serif'}} />
                    </div>
                  </div>
                </div>
                <div className="password-input">
                  <div className="text-wrapper-13">Enter password</div>
                  <div className="overlap-group-wrapper">
                    <div className="div-wrapper">
                      <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" type="password" label="Password" variant="outlined" style={{width: '425px', fontFamily: 'Questrial, sans-serif'}} />
                    </div>
                  </div>
                </div>
                <Button variant='text' style={{
                  top: '425px', 
                  left: '300px', 
                  width: '200px', 
                  fontFamily: 'Questrial, sans-serif', 
                  textTransform: 'none', 
                  fontSize: '12px'}}
                  component={Link} to='/forgotPassword'>
                    Forgot Password?
                </Button>
                <Button variant="contained" style={{
                  width: '425px', 
                  top: '500px', 
                  left: '30px', 
                  fontFamily: 'Source Sans Pro, monospace', 
                  textTransform: 'none'}} 
                  type="submit">
                    Sign In
                </Button>
                {errorMessage && <div style={{marginLeft: '45px', marginTop: '400px', marginBottom: '20px', color: 'red' }}>{errorMessage}</div>}
              </form>
            </div>
          </div>
       
          <div className="about-section">
            <div className="text-wrapper-15">About Raise the Bar</div>
            <div className="text-wrapper-16">
              Finding the right workout plan can be tough. There is an intimidatingly large number of resources, for new and experienced gym goers alike, to parse through to find a suitable workout. And even with that, it is not always clear which workout routines are better than others, or which ones are better suited to your needs. <br/> <br/>
              Not only is there difficulty in finding the right workout routines, but it can also prove difficult—or tedious—to track the workouts that you’ve completed in the past and keep note of any personal records that you may have achieved in certain sessions. Having to use a pencil and paper, or a notes app on mobile phones, to notate this seems behind the times in our technological age.
              <br/> <br/>
              Raise the bar is web-based training application that uses generative AI to provide users with immediate, customized workout routines depending on their specifications. Raise the Bar distinguishes itself from other workout applications (in three distinct ways) by including an interactive user interface that enables users to check off exercises as they are completed, different routines catered to users depending on how often they expect to work out, and a user profile that tracks workout progress. This all comes together to create a satisfying workout experience for gym enthusiasts, who no longer need to search through numerous sources to find a desirable exercise routine, and no longer need to use non-digital, or inefficient means, to try and keep track of their workouts.
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInScreen;
