import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tabs from './Tabs';
import { useStyles } from './styles/NavBarStyles.js';

function NavBar() {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.bar}>
      <Toolbar className={classes.toolbar}>
        <Tabs />
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
