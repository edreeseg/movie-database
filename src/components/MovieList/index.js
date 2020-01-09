import React from 'react';
import PropTypes from 'prop-types';
import Movie from '../Movie';
import Loading from '../Loading';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '70%',
    margin: '0 auto',
    marginTop: '30px',
    overflow: 'auto',
    textAlign: 'center',
    '& h4': {
      marginTop: '30px',
    },
  },
}));

function MovieList({ movies, pageNumber, loading }) {
  const classes = useStyles();
  const generatePage = (arr, n) => {
    // Generate an array to represent the current page
    const pageSize = 10;
    const start = (n - 1) * pageSize;
    const end = start + pageSize;
    return arr.slice(start, end);
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <Paper classes={classes}>
      {movies.length ? (
        generatePage(movies, pageNumber).map(movie => (
          <Movie key={movie.movie_id} data={movie} />
        ))
      ) : (
        <Typography variant="h4">No Matching Movies Found</Typography>
      )}
    </Paper>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array,
  pageNumber: PropTypes.number,
  loading: PropTypes.bool,
};

export default MovieList;
