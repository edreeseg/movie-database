import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { MdHelpOutline } from 'react-icons/md';
import Tabs from './Tabs';
import { useStyles } from './styles/NavBarStyles.js';

function NavBar({ tabIndex, setTabIndex }) {
  const classes = useStyles();
  return (
    <AppBar position="static" className={classes.bar}>
      <Toolbar className={classes.toolbar}>
        <Tabs tabIndex={tabIndex} setTabIndex={setTabIndex} />
        <MdHelpOutline className={classes.helpButton} />
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  tabIndex: PropTypes.number,
  setTabIndex: PropTypes.func,
};

export default NavBar;
