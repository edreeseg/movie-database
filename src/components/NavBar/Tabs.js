import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    minHeight: '56px',
    marginRight: theme.spacing(2),
    flexGrow: 1,
  },
  indicator: {
    background: '#09afdf',
  },
}));

function TabsContainer({ tabIndex, setTabIndex }) {
  // Creation of tabs to update view below the navbar, when a user would like to
  // switch between viewing movies and adding a new movie
  const handleChange = (ev, value) => {
    setTabIndex(value);
  };
  const classes = useStyles();
  return (
    <Tabs
      value={tabIndex}
      onChange={handleChange}
      aria-label="Navigation tabs"
      classes={classes}
    >
      <Tab label="View Movies" id="nav-tab-0" ariaControls="nav-tabpanel-0" />
      <Tab label="Add Movie" id="nav-tab-1" ariaControls="nav-tabpanel-1" />
    </Tabs>
  );
}

TabsContainer.propTypes = {
  tabIndex: PropTypes.number,
  setTabIndex: PropTypes.func,
};

export default TabsContainer;
