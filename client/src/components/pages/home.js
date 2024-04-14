import React from "react";
import Button from '@mui/material/Button';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Link } from "react-router-dom";

import UserNavbar from "./userNavbar";

import "./home.css";

export const HomeScreen = () => {
  return (
    <div className="home-screen">
      {/* navbar */}
      <UserNavbar />
      <div className='home'>
        <Grid2 container spacing={25} disableEqualOverflow>
          <Grid2 item>
            {/* Chat with AI Button */}
            <Button variant="contained" style={{
              width: '20vw', 
              height: '20vw', 
              borderRadius: '20px',
              boxShadow: '0px 2px 20px 4px #00000040',

              backgroundColor: '#FFFFFF',
              color: '#000000',
              fontFamily: 'Source Sans Pro, monospace', 
              textTransform: 'none',
              fontSize: '40px',
              textAlign: 'center',
              fontWeight: '700'
              }} component={Link} to='/chat/:id'>
              Create <br />
              Workout
            </Button>
          </Grid2>
          <Grid2 item>
            {/* View Workout Progress Button */}
            <Button variant="contained" style={{
              width: '20vw', 
              height: '20vw', 
              borderRadius: '20px',
              boxShadow: '0px 2px 20px 4px #00000040',

              backgroundColor: '#FFFFFF',
              color: '#000000',
              fontFamily: 'Source Sans Pro, monospace', 
              textTransform: 'none',
              fontSize: '40px',
              textAlign: 'center',
              fontWeight: '700'
              }} component={Link} to='/progress/:id'>
              Workout <br />
              Progress
            </Button>
          </Grid2>
          <Grid2 item>
            {/* See User Profile Button */}
            <Button variant="contained" style={{
              width: '20vw', 
              height: '20vw', 
              borderRadius: '20px',
              boxShadow: '0px 2px 20px 4px #00000040',



              backgroundColor: '#FFFFFF',
              color: '#000000',
              fontFamily: 'Source Sans Pro, monospace', 
              textTransform: 'none',
              fontSize: '40px',
              textAlign: 'center',
              fontWeight: '700'
              }} component={Link} to='/profile/:id'>
              View <br />
              Profile
            </Button>
          </Grid2>
        </Grid2>
      </div>
      
    </div>
  );
};

export default HomeScreen;