import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Checkbox from './Checkbox';
import { useStyles } from './styles/GenreSelectStyles';

function GenreSelect({ genres, setCheckedGenres, checkedGenres }) {
  const classes = useStyles();
  const handleGenreChange = ev => {
    // Make use of ES6 Map to keep track of which checkboxes have been selected
    const genre = ev.target.name;
    const isChecked = ev.target.checked;
    setCheckedGenres(map => new Map(map.set(genre, isChecked)));
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
  genres: PropTypes.array,
  setCheckedGenres: PropTypes.func,
  checkedGenres: PropTypes.instanceOf(Map),
};

export default GenreSelect;
