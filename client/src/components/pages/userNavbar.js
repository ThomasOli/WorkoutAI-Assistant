import React from 'react';

import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

import './userNavbar.css';

const drawerWidth = 240;
const navItems = [{key: 'Create Workout', link: '/chat/:id'}, {key: 'Workout Progress', link: '/progress/:id'}, {key: 'Profile', link: '/profile/:id'}, { key: 'Log Out', link: '/login'}];

export const UserNavbar = (props) => {
  const { window } = props;
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Raise the Bar
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} component={Link} to={item.link}>
              <ListItemText primary={item.key} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#102d3d' }}>
      <AppBar component="nav" sx={{backgroundColor: '#102d3d'}} position='fixed'>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Button variant='text' style={{
          color: '#ffffff',
          fontFamily: 'Source Sans Pro-Bold, monospace',
          fontSize: '44px',
          fontStyle: 'bold',
          fontWeight: '700',
          left: '30%',
          letterSpacing: '0px',
          textAlign: 'center',
          width: '350px',
          height: 'inherit',
          textTransform: 'none',
          backgroundColor: 'inherit'}}
          disableRipple
          component={Link} to='/home/:id'>
            Raise The Bar
          </Button>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          open={drawerOpen}
          onClick={handleDrawerToggle}
          sx={{
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  )
}

UserNavbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default UserNavbar;