import React from 'react';
import { UserNavbar } from "./userNavbar";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './progressPage.css'

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: '3', width:'80%', height:'400px' }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export const ProgressPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className='progress-screen'>
      <UserNavbar/>  
        <div className='overlay-background'>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="In Progress" {...a11yProps(0)} />
            <Tab label="Completed" {...a11yProps(1)} />
            <Tab label="Favorites" {...a11yProps(2)} />
          </Tabs>
          <CustomTabPanel value={value} index={0}>
            In Progress
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            Completed
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            Favorites
          </CustomTabPanel>
        </div>   
    </div>

  )
}

export default ProgressPage