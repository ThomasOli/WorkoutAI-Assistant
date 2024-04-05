import React, { useState } from 'react';
import { UserNavbar } from "./userNavbar";
import './profilePage.css';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link } from 'react-router-dom';

export const ProfilePage = () => {
  const [userStat, setUserStat] = useState(true);
  const [userInfo, setUserInfo] = useState(false);
  const [notif, setNotif] = useState(false);

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
        <Grid2 container spacing={0} paddingBottom={'10px'}>
          <Grid2 item xs={12} md={2}>
            <ButtonGroup orientation='vertical' 
              aria-label='Vertical Button Group'
              variant='text'
            >
              <Button
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
              </Button>
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
                component={Link} to='/login'
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
          <Grid2 item xs={12} md={10} backgroundColor='grey'>
            {/* based on which section the user selects */}
            {userInfo && (<Box height='100vh' margin='10px'>userInfo</Box>)}
            {userStat && (<Box height='1000px' margin='10px'>user stats</Box>)}
            {notif && (<Box margin='10px'> notifications </Box>)}
          </Grid2>
        </Grid2>
      </div>
    </div>

  )
}

export default ProfilePage