import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from './Checkbox';
import { useStyles } from './styles/RatingSelectStyles';

function RatingSelect({ ratings, setCheckedRatings, checkedRatings }) {
  const classes = useStyles();
  const handleRatingChange = ev => {
    // Make use of ES6 Map to keep track of which checkboxes have been selected
    const rating = ev.target.name;
    const isChecked = ev.target.checked;
    setCheckedRatings(map => new Map(map.set(rating, isChecked)));
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
  ratings: PropTypes.array,
  setCheckedRatings: PropTypes.func,
  checkedRatings: PropTypes.instanceOf(Map),
};

export default RatingSelect;
