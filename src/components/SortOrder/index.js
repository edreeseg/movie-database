import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import { useStyles, useContainerStyles } from './styles/SortOrderStyles';
import * as actions from '../../redux/actions';

function SortOrder({ orderIsDescending, toggleSortOrder }) {
  // Component to handle switching order of sorting between ascending and descending
  const classes = useStyles();
  const containerClasses = useContainerStyles();
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
            onChange={toggleSortOrder}
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
  toggleSortOrder: PropTypes.func,
};

const mapStateToProps = state => ({
  orderIsDescending: state.orderIsDescending,
});

export default connect(mapStateToProps, {
  toggleSortOrder: actions.toggleSortOrder,
})(SortOrder);
