import axios from 'axios';

export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const GET_MOVIES = 'GET_MOVIES';
export const ADD_MOVIE = 'ADD_MOVIE';
export const EDIT_MOVIE = 'EDIT_MOVIE';
export const DELETE_MOVIE = 'DELETE_MOVIE';

function attachErrorMessage(error, defaultMessage = 'An error occurred') {
  if (error.response && error.response.data) {
    return error.response.data.message;
  }
  return defaultMessage;
}

export const getMovies = () => dispatch => {
  dispatch({ type: LOADING });
  axios
    .get(
      `https://homework.eegapis.com/movies?api_key=${process.env.REACT_APP_API_KEY}`
    )
    .then(res => dispatch({ type: GET_MOVIES, payload: res.data.movies }))
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: attachErrorMessage(
          err,
          'There was a problem retrieving movies'
        ),
      })
    );
};
