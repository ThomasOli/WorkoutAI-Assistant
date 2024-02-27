import React from "react";
// import { ForgotPassword } from "./ForgotPassword";
// import Logo from "./images/raisethebarLogoNoBackground.png";
// import { SignInButton } from "./SignInButton";
// import { TopNavBar } from "./TopNavBar";
// to create button
// import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./loginScreen.css";
import glassFrameBackground from '../images/glassFrameBackground.png'

export const LogInScreen = () => {
  return (
    <div className="log-in-screen">
      <div className="overlap-wrapper">
        <div className="overlap">
          <div className="overlap-group">
            {/* allows for glass color block */}
            <img className="color-block-frame" alt="Color block frame" src={glassFrameBackground} />
            {/* text on left hand side */}
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
                  <Button variant='text'>Register Here</Button>
                  {/* <span className="text-wrapper-9"> Register here</span> */}
                  <span className="span"> !</span>
                </p>
              </div>
            </div>
            {/* begins right hand side */}
            <div className="log-in-card">
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
                    <TextField id="outlined-basic" label="Email" variant="outlined" style={{width: '425px'}}/>
                  </div>
                </div>
              </div>
              <div className="password-input">
                <div className="text-wrapper-13">Enter password</div>
                <div className="overlap-group-wrapper">
                  <div className="div-wrapper">
                    <TextField id="outlined-basic" label="Password" variant="outlined" style={{width: '425px'}} />
                  </div>
                  
                </div>
              </div>
              <Button variant="contained" style={{width: '425px', top: '500px', left: '30px'}}>Sign In</Button>
            </div>
            {/* add top navbar */}
            {/* <TopNavBar
              aboutDivClassName="top-nav-bar-2"
              className="top-nav-bar-instance"
              propertyDefaultWrapperDivClassName="top-nav-bar-2"
            /> */}
            {/* <Logo className="logo-instance" /> */}
          </div>
          {/* about section bottom left side */}
          <div className="about-section">
            <div className="text-wrapper-15">About...</div>
            <div className="text-wrapper-16">(add information)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogInScreen;
