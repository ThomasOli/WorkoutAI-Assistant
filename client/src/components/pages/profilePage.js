import React, { useState, useEffect } from 'react';
import { UserNavbar } from "./userNavbar";
import './profilePage.css';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';

import axios from 'axios';

// add if logout, reset local storage of current user to empty

export const ProfilePage = () => {
  const [userStat, setUserStat] = useState(false);
  const [userInfo, setUserInfo] = useState(true);
  const [notif, setNotif] = useState(false);
  const [userFirstName, setUserFirstName] = useState('test');
  const [userLastName, setUserLastName] = useState('case');
  const [userEmail, setUserEmail] = useState('example@gmail.com');
  const [edit, setEdit] = useState(false);
  const [currFirstName, setCurrFirstName] = useState(userFirstName);
  const [currLastName, setCurrLastName] = useState(userLastName);
  const [currEmail, setCurrEmail] = useState(userEmail);

  const handleEdit = () => {
    setEdit(!edit);
  };
  
  const handleSave = async (e) => {
    setUserFirstName(currFirstName);
    setUserLastName(currLastName);
    setUserEmail(currEmail);
    e.preventDefault();
    try {
      // send to backend
      // const res = await axios.post('http://localhost:5000/login', { email, password });
      // console.log(res.data);
      // localStorage.setItem('currentUser', JSON.stringify(res.data.user));
    } catch (error) {
      console.error('Error Send to Database: ', error);
    }

    // push changes to database
    // probably create a function to push the updates
    setEdit(false);
  }

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // const res = await axios.get('http://localhost:5000/record')
        const response = await axios.get('http://localhost:5000/api/record/:id', {_id: '65e8dc74dc06edb399d8b44a'});
        console.log("getting user name values");
        console.log(response);
        console.log("getting user email value");
        setUserEmail(response.data);
        // console.log(tasks);
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
    fetchUserInfo();
  }, []);

  const userInfoEdit = () => {
    return (
      <Box width='auto' height='100%' margin='10px'>
        <form onSubmit={handleSave}>
          <Grid2 container spacing={2} rows={3} rowSpacing={3}>
            <Grid2 item xs={9}>
              <Box style={{height: '30px'}}>
                User Information
              </Box>
            </Grid2>
            <Grid2 item>
              <Button variant="contained" style={{
                width: '100px', 
                margin: '5px',
                height: '30px',
                fontFamily: 'Source Sans Pro, monospace', 
                textTransform: 'none'}} 
                type='submit'>
                  save
              </Button>
            </Grid2>
            <Grid2 item xs={6}>
              <TextField 
                id="outlined-basic" 
                label="First Name" 
                variant="outlined" 
                style={{marginTop: '15px', width: '440px', fontFamily: 'Questrial, sans-serif'}}
                value={currFirstName}
                onChange={(e) => setCurrFirstName(e.target.value)}/>
            </Grid2>
            <Grid2 item>
              <TextField 
                id="outlined-basic" 
                label="Last Name" 
                variant="outlined" 
                style={{marginTop: '15px', width: '440px', fontFamily: 'Questrial, sans-serif'}}
                value={currLastName}
                onChange={(e) => setCurrLastName(e.target.value)}/>
            </Grid2>
            <Grid2 item xs={6}>
              <TextField 
                id="outlined-basic" 
                label="Email" 
                variant="outlined" 
                style={{marginTop: '15px', width: '440px', fontFamily: 'Questrial, sans-serif'}}
                value={currEmail}
                onChange={(e) => setCurrEmail(e.target.value)}/>
            </Grid2>
          </Grid2>
        </form>
        
      </Box>
    );
  };
  
  const userInfoDefault = () => {
    return (
      <Box width='auto' height='100%' margin='10px'>
        <Grid2 container spacing={2} rows={2} rowSpacing={3}>
          <Grid2 item xs={9}>
            <Box style={{height: '30px'}}>
              User Information
            </Box>
          </Grid2>
          <Grid2 item xs={6}>
            <TextField 
              disabled
              id="filled-basic" 
              label="First Name" 
              variant="filled" 
              style={{marginTop: '15px', width: '440px', fontFamily: 'Questrial, sans-serif'}}
              value={userFirstName}/>
          </Grid2>
          <Grid2 item>
            <TextField 
              disabled
              id="filled-basic" 
              label="Last Name" 
              variant="filled" 
              style={{marginTop: '15px', width: '440px', fontFamily: 'Questrial, sans-serif'}}
              value={userLastName}/>
          </Grid2>
          <Grid2 item xs={6}>
            <TextField 
              disabled
              id="filled-basic" 
              label="Email" 
              variant="filled" 
              style={{marginTop: '15px', width: '440px', fontFamily: 'Questrial, sans-serif'}}
              value={userEmail}/>
          </Grid2>
          <Grid2 item>
            {/* Link to forgot password page to reset it */}
            <Button variant="contained" style={{
              width: '200px', 
              margin: '30px',
              height: '30px',
              fontFamily: 'Source Sans Pro, monospace', 
              textTransform: 'none'}} 
              href='/forgotPassword' rel='noopener'>
                reset password
            </Button>
          </Grid2>
          <Grid2 item>
            <Button variant="contained" style={{
              width: '100px', 
              margin: '30px',
              height: '30px',
              fontFamily: 'Source Sans Pro, monospace', 
              textTransform: 'none'}} 
              onClick={handleEdit}>
                edit
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    );
  };

  const userInfoPart = () => {
    if(edit) {
      return userInfoEdit();
    } else {
      return userInfoDefault();
    }
  };

  const userStatPart = () => {
    return (
      <Box height='1000px' margin='10px'>
        user stats

      </Box>
    );
  };

  const notifPart = () => {
    return (
      <Box margin='10px'>
        Notification Settings
        Change when you get email remidners
        <br/>
        <Grid2 container>
          <Grid2 item xs={8}>
            Daily Workout Reminders (...)
          </Grid2>
          <Grid2 item>
            {/* add on change */}
            <Switch></Switch>
          </Grid2>
          <Grid2 item xs={8}>
            Daily Workout Reminders (...)
          </Grid2>
          <Grid2 item>
            {/* add on change */}
            <Switch></Switch>
          </Grid2>
        </Grid2>
      </Box>
    )
  }

  const handleUserStats = () => {
    setUserStat(true);
    setNotif(false);
    setUserInfo(false);
  };

  const handleUserInfo = () => {
    setUserStat(false);
    setNotif(false);
    setUserInfo(true);
  };

  const handleNotifications = () => {
    setUserStat(false);
    setNotif(true);
    setUserInfo(false);
  };

  return (
    
    <div className='profile-page'>
      <UserNavbar/>
      {/* <div className='nav-pad'></div> */}
      <div className='profile'>
        <Grid2 container spacing={0} paddingBottom={'10px'} rows={2}>
        <Grid2 item xs={12}>
            <Box style={{margin: '10px', height: '50px', fontFamily: 'Source Sans Pro, monospace', fontSize: '40px'}}>
              Hello, {userFirstName} {userLastName}!
            </Box>
          </Grid2>
          <Grid2 item xs={12} md={2} paddingTop='20px'>
            <ButtonGroup orientation='vertical' 
              aria-label='Vertical Button Group'
              variant='text'
            >
              {/* <Button
                onClick={handleUserStats}
                sx={{
                  fontFamily: 'Hind Vadodara, sans-serif', 
                  textTransform: 'none', 
                  fontSize: '20px', 
                  fontWeight: '400',
                  height: 'auto',
                }}
              >
                User Stats
              </Button> */}
              <Button
                onClick={handleUserInfo}
                sx={{
                  fontFamily: 'Hind Vadodara, sans-serif', 
                  textTransform: 'none', 
                  fontSize: '20px', 
                  fontWeight: '400',
                  height: 'auto'
                }}
              >
                User Information
              </Button>
              <Button
                onClick={handleNotifications}
                sx={{
                  fontFamily: 'Hind Vadodara, sans-serif', 
                  textTransform: 'none', 
                  fontSize: '20px', 
                  fontWeight: '400',
                  height: 'auto'
                }}
              >
                Notifications
              </Button>
              <Button
                href='/login'
                sx={{
                  fontFamily: 'Hind Vadodara, sans-serif', 
                  textTransform: 'none', 
                  fontSize: '20px', 
                  fontWeight: '400',
                  height: 'auto'
                }}
              >
                Logout
              </Button>
            </ButtonGroup>
          </Grid2>
          <Grid2 item xs={12} md={10}>
            {/* based on which section the user selects */}
            {userInfo && (userInfoPart())}
            {/* {userStat && (userStatPart())} */}
            {notif && (notifPart())}
          </Grid2>
        </Grid2>
      </div>
    </div>

  )
}

export default ProfilePage