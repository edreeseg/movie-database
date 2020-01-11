import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from './Checkbox';
import { useStyles } from './styles/GenreSelectStyles';
import * as actions from '../../redux/actions';

const genres = [
  'action',
  'comedy',
  'drama',
  'fantasy',
  'horror',
  'musical',
  'romance',
];

function GenreSelect({ changeCheckedGenres, checkedGenres }) {
  const classes = useStyles();
  const handleGenreChange = ev => {
    // Make use of ES6 Map to keep track of which checkboxes have been selected
    const genre = ev.target.name;
    changeCheckedGenres(genre);
  };
  return (
    <Grid classes={classes}>
      {genres.map(genre => {
        return (
          <Paper
            key={genre}
            component="section"
            className={classes.item}
            elevation={2}
          >
            <label htmlFor={`genre-checkbox-${genre}`}>
              {genre[0].toUpperCase() + genre.slice(1)}
            </label>
            <Checkbox
              name={genre}
              onChange={handleGenreChange}
              map={checkedGenres}
              id={`genre-checkbox-${genre}`}
            />
          </Paper>
        );
      })}
    </Grid>
  );
}

GenreSelect.propTypes = {
  changeCheckedGenres: PropTypes.func,
  checkedGenres: PropTypes.instanceOf(Map),
};

const mapStateToProps = state => ({
  checkedGenres: state.checkedGenres,
});

export default connect(mapStateToProps, {
  changeCheckedGenres: actions.changeCheckedGenres,
})(GenreSelect);
