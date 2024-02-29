import React from "react";
import logo from "../images/raisethebarLogoNoBackground.png";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import UserNavbar from "./userNavbar";
import DrawerAppBar from './menuBarTest';
import "./home.css";

export const HomeScreen = () => {
  return (
    <div className="home-screen">
      {/* navbar */}
      {/* <DrawerAppBar/> */}
      <UserNavbar />
      {/* Chat with AI Button */}
      <Button variant="contained" style={{
          width: '284px', 
          height: '284px', 
          borderRadius: '20px',
          boxShadow: '0px 2px 20px 4px #00000040',
          left: '150px',
          position: 'absolute',
          top: '229px',
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
      {/* View Workout Progress Button */}
      <Button variant="contained" style={{
          width: '284px', 
          height: '284px', 
          borderRadius: '20px',
          boxShadow: '0px 2px 20px 4px #00000040',
          left: '775px',
          position: 'absolute',
          top: '229px',
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
      {/* See User Profile Button */}
      <Button variant="contained" style={{
          width: '284px', 
          height: '284px', 
          borderRadius: '20px',
          boxShadow: '0px 2px 20px 4px #00000040',
          left: '475px',
          position: 'absolute',
          top: '655px',
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
    </div>
  );
};

export default HomeScreen;