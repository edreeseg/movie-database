import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from './Checkbox';
import { useStyles } from './styles/RatingSelectStyles';
import * as actions from '../../redux/actions';

const ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];

function RatingSelect({ checkedRatings, changeCheckedRatings }) {
  const classes = useStyles();
  const handleRatingChange = ev => {
    // Make use of ES6 Map to keep track of which checkboxes have been selected
    const rating = ev.target.name;
    changeCheckedRatings(rating);
  };
  return (
    <Grid classes={classes}>
      {ratings.map(rating => {
        return (
          <Paper
            key={rating}
            component="section"
            elevation={2}
            className={classes.item}
          >
            <label htmlFor={`rating-checkbox-${rating}`}>{rating}</label>
            <Checkbox
              name={rating}
              onChange={handleRatingChange}
              map={checkedRatings}
              id={`rating-checkbox-${rating}`}
            />
          </Paper>
        );
      })}
    </Grid>
  );
}

RatingSelect.propTypes = {
  changeCheckedRatings: PropTypes.func,
  checkedRatings: PropTypes.instanceOf(Map),
};

const mapStateToProps = state => ({
  checkedRatings: state.checkedRatings,
});

export default connect(mapStateToProps, {
  changeCheckedRatings: actions.changeCheckedRatings,
})(RatingSelect);
