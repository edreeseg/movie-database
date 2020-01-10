import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '& span': {
      color: '#09afdf',
    },
  },
  switchBase: {
    padding: 2,
    color: '#09afdf',
    '&$checked': {
      transform: 'translateX(12px)',
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.common.white,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  track: {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.common.white,
  },
  checked: {},
}));

const useContainerStyles = makeStyles(theme => ({
  root: {
    order: '-1',
    alignSelf: 'center',
    [theme.breakpoints.up(424)]: {
      position: 'absolute',
      top: 0,
      right: '80px',
    },
    [theme.breakpoints.up(710)]: {
      position: 'static',
    },
  },
}));

function SortOrder({ orderIsDescending, setOrderIsDescending, hide }) {
  // Component to handle switching order of sorting between ascending and descending
  const classes = useStyles();
  const containerClasses = useContainerStyles();
  const handleChange = ev => {
    setOrderIsDescending(prev => !prev);
  };
  return (
    <Typography component="div" classes={containerClasses}>
      <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item style={orderIsDescending ? null : { fontWeight: 'bold' }}>
          Asc
        </Grid>
        <Grid item>
          <Switch
            classes={classes}
            checked={orderIsDescending}
            value="checked"
            onChange={handleChange}
          />
        </Grid>
        <Grid item style={orderIsDescending ? { fontWeight: 'bold' } : null}>
          Desc
        </Grid>
      </Grid>
    </Typography>
  );
}

SortOrder.propTypes = {
  orderIsDescending: PropTypes.bool,
  setOrderIsDescending: PropTypes.func,
  hide: PropTypes.bool,
};

export default SortOrder;
