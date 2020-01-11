import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Movie from '../Movie';
import Loading from '../Loading';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '98%',
    margin: '30px auto',
    overflow: 'auto',
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
    return (
      <Paper
        classes={classes}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '200px',
        }}
      >
        <Loading />
      </Paper>
    );
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

const mapStateToProps = state => ({
  movies: state.movies,
  pageNumber: state.pageNumber,
  loading: state.loading,
});

export default connect(mapStateToProps)(MovieList);
