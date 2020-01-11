import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import * as actions from '../../redux/actions';

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

const useTabStyles = makeStyles(theme => ({
  root: {
    [theme.breakpoints.down(254)]: {
      fontSize: '5vw',
    },
  },
}));

function TabsContainer({ tabIndex, changeTabIndex }) {
  // Creation of tabs to update view below the navbar, when a user would like to
  // switch between viewing movies and adding a new movie
  const handleChange = (ev, value) => {
    changeTabIndex(value);
  };
  const classes = useStyles();
  const tabClasses = useTabStyles();
  return (
    <Tabs
      value={tabIndex}
      onChange={handleChange}
      aria-label="Navigation tabs"
      classes={classes}
    >
      <Tab
        label="View Movies"
        id="nav-tab-0"
        aria-controls="nav-tabpanel-0"
        classes={tabClasses}
      />
      <Tab
        label="Add Movie"
        id="nav-tab-1"
        aria-controls="nav-tabpanel-1"
        classes={tabClasses}
      />
    </Tabs>
  );
}

TabsContainer.propTypes = {
  tabIndex: PropTypes.number,
  changeTabIndex: PropTypes.func,
};

const mapStateToProps = state => ({
  tabIndex: state.tabIndex,
});

export default connect(mapStateToProps, {
  changeTabIndex: actions.changeTabIndex,
})(TabsContainer);
