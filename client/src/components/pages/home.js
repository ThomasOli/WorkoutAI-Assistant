import React, {useState} from "react";
import Button from '@mui/material/Button';
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Link } from "react-router-dom";

import UserNavbar from "./userNavbar";

import "./home.css";

export const HomeScreen = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="home-screen">
      {/* navbar */}
      <UserNavbar />
      <div className='home'>
        <Grid2 container rowSpacing={10} columnSpacing={15} justify="center" alignItems="center" maxWidth={'100%'}>
          <Grid2 item xs={6}>
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
          <Grid2 item xs={6}>
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
          <Grid2 item >
            {/* Pre / Post Workout Rec Button */}
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
              }} onClick={handleOpen}>
              Pre / Post <br/>
              Workout <br/>
              Recommendations
            </Button>
          </Grid2>
        </Grid2>
        {/* Pop Up for Pre / Post Workout Recs */}
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{color: '#000000', fontFamily: 'Source Sans Pro, monospace', fontSize: '36px', textAlign: 'center', fontWeight: '700'}}>Pre & Post Workout Recommendations</DialogTitle>
        <DialogContent>
          <h2 style={{color: '#FFAD41', fontFamily: 'Questrial, sans-serif'}}>Pre Workout Recommendations</h2>
          <p>Popup content goes here.</p>
          <br/>
          <h2 style={{color: '#476E78', fontFamily: 'Questrial, sans-serif'}}> Post Workout Recommendations </h2>
          <p>add suggestions</p>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' onClick={handleClose} sx={{color: '#FFFFFF', backgroundColor: '#102D3D', "&:hover": {backgroundColor: "#476e78"}}}>Close</Button>
        </DialogActions>
      </Dialog>
      </div>
      
    </div>
  );
};

export default HomeScreen;