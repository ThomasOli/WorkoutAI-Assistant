import React, { useState } from "react";
import axios from "axios";

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from "@mui/material/Box";
import { useNavigate, Link } from "react-router-dom";
import "./loginScreen.css";
// import glassFrameBackground from '../images/glassFrameBackground.png'

export const LogInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    
    e.preventDefault();
  
    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }
  
    try {
      const res = await axios.post('http://localhost:5000/login', { email, password });
      const userId = res.data.user.userId; // Extract userId from response
  
      // Navigate to /home/:userId route
      navigate(`/home/${userId}`);
  
    } catch (error) {
      setErrorMessage('Incorrect Combination, Please Try Again');
    }
  };

  return (
    <div className="log-in-screen">
      <Box sx={{
        height: 'auto',
        color: '#ffffff',
        fontFamily: 'Hind Vadodara, sans-serif',
        fontSize: '40px',
        fontWeight: '400',
        lineHeight: 'normal',
        width: '500px',
        position: 'absolute',
        top: '100px',
        left: '0px',
        marginLeft: '50px'}}
      >
        Sign In to
        <Box sx={{
          height: '70px',
          color: '#ffffff',
          fontFamily: 'Source Sans Pro-Bold, monospace',
          fontSize: '60px',
          fontWeight: '700',
          lineHeight: 'normal',
          width: '450px'}}
        >
          Raise the Bar
        </Box>
        <Box sx={{
          height: '40px',
          color: '#ffffff',
          fontFamily: 'Questrial, sans-serif',
          fontSize: '20px',
          fontWeight: '400',
          lineHeight: 'normal',
          width: '400px'
          }}
        >
          Simplifying and Improving your physical life, one rep at a time.
        </Box>
        <Box sx={{
          height: '50px',
          color: '#ffffff',
          fontFamily: 'Hind Vadodara, sans-serif',
          fontSize: '20px',
          fontWeight: '400',
          lineHeight: 'normal',
          width: '350px',
          paddingTop: '20px'
        }}
        >
          If you don’t have an account register
        </Box>
        <Box sx={{
          height: '30px',
          color: '#ffffff',
          fontFamily: 'Hind Vadodara, sans-serif',
          fontSize: '20px',
          fontWeight: '400',
          lineHeight: 'normal',
          width: '350px'
          }}
        >
          You can
          <Button variant='text' style={{
            fontFamily: 'Hind Vadodara, sans-serif', 
            textTransform: 'none', 
            fontSize: '20px', 
            fontWeight: '400',
            height: '20px',
            width: '140px',
            top: '-2px'}}
            component={Link} to='/createAccount'> 
              Register Here
          </Button>
          !
        </Box>
      </Box>
      
      <Box sx={{
        backgroundColor: '#ffffff',
        borderRadius: '40px',
        boxShadow: '0px 4px 35px #00000014',
        height: '600px',
        position: 'absolute',
        top: '150px',
        left: '650px',
        width: '500px',
        zIndex: 1
      }}>
        <form onSubmit={handleLogin}>
          <Box sx={{
            fontFamily: 'Hind Vadodara, sans-serif', 
            textTransform: 'none', 
            fontSize: '24px', 
            fontWeight: '400',
            width: '450px',
            height: 'fit-contents',
            marginLeft: '20px',
            marginTop: '40px'
          }}>
            <Box> 
              <Box>Welcome to Raise the Bar</Box>
            </Box>
            <Box sx={{
              height: '70px',
              color: '#000000',
              fontFamily: 'Source Sans Pro-Bold, monospace',
              fontSize: '60px',
              fontWeight: '700',
              lineHeight: 'normal',
              width: '400px'
            }}> Sign In</Box>
          </Box>
          <Box sx={{
            color: '#000000',
            fontFamily: 'Questrial, sans-serif',
            fontSize: '18px',
            fontWeight: '400',
            lineHeight: 'normal',
            width: '440px',
            margin: '30px'
          }}> 
            Enter Email Address:
            <TextField value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" label="Email" variant="outlined" style={{marginTop: '15px', width: '440px', fontFamily: 'Questrial, sans-serif'}} />
          </Box>
          <Box sx={{
            color: '#000000',
            fontFamily: 'Questrial, sans-serif',
            fontSize: '18px',
            fontWeight: '400',
            lineHeight: 'normal',
            width: '440px',
            margin: '30px'
          }}>
            Enter Password:
            <TextField value={password} onChange={(e) => setPassword(e.target.value)} id="outlined-basic" type="password" label="Password" variant="outlined" style={{marginTop: '15px', width: '440px', fontFamily: 'Questrial, sans-serif'}} />
          </Box>
          <Button variant='text' style={{
            left: '360px',
            width: '120px', 
            fontFamily: 'Questrial, sans-serif', 
            textTransform: 'none', 
            fontSize: '12px'}}
            component={Link} to='/forgotPassword'>
              Forgot Password?
          </Button>
          {errorMessage && <div style={{marginLeft: '30px', top: '-30px', position: 'relative', color: 'red' }}>{errorMessage}</div>}
          <Button variant="contained" style={{
            width: '440px', 
            margin: '30px',
            height: '50px',
            fontFamily: 'Source Sans Pro, monospace', 
            textTransform: 'none'}} 
            type="submit">
              Sign In
          </Button>
        </form>
      </Box>
      
      <div className="glass"></div>
      <Box sx={{
        color: '#000000',
        fontFamily: 'Source Sans Pro-Bold, monospace',
        fontSize: '40px',
        fontWeight: '700',
        letterSpacing: '0',
        lineHeight: 'normal',
        height: 'fit-content',
        width: '550px',
        marginLeft: '40px',
        marginTop: '20px',
        top: '400px',
        left: '0px',
        position: 'absolute'
      }}>
        About Raise the Bar
        <Box sx={{
          color: '#000000',
          fontFamily: 'Hind Vadodara, sans-serif',
          fontSize: '20px',
          fontWeight: '300',
          letterSpacing: '0',
          lineHeight: 'normal',
          height: 'fit-content',
          width: '550px',
          marginTop: '20px'
        }}
        >
          Finding the right workout plan can be tough. There is an intimidatingly large number of resources, for new and experienced gym goers alike, to parse through to find a suitable workout. And even with that, it is not always clear which workout routines are better than others, or which ones are better suited to your needs. <br/> <br/>
          Not only is there difficulty in finding the right workout routines, but it can also prove difficult—or tedious—to track the workouts that you’ve completed in the past and keep note of any personal records that you may have achieved in certain sessions. Having to use a pencil and paper, or a notes app on mobile phones, to notate this seems behind the times in our technological age.
          <br/> <br/>
          Raise the bar is web-based training application that uses generative AI to provide users with immediate, customized workout routines depending on their specifications. Raise the Bar distinguishes itself from other workout applications (in three distinct ways) by including an interactive user interface that enables users to check off exercises as they are completed, different routines catered to users depending on how often they expect to work out, and a user profile that tracks workout progress. This all comes together to create a satisfying workout experience for gym enthusiasts, who no longer need to search through numerous sources to find a desirable exercise routine, and no longer need to use non-digital, or inefficient means, to try and keep track of their workouts.
        </Box>
      </Box>
    </div>  
  );
};

export default LogInScreen;
