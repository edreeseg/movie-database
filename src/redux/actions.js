import axios from 'axios';

export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const GET_MOVIES = 'GET_MOVIES';
export const ADD_MOVIE = 'ADD_MOVIE';
export const EDIT_MOVIE = 'EDIT_MOVIE';
export const DELETE_MOVIE = 'DELETE_MOVIE';
export const MOVIE_SEARCH = 'MOVIE_SEARCH';
export const CHANGE_TAB_INDEX = 'CHANGE_TAB_INDEX';
export const CONTROL_PANEL_HEIGHT_CHANGE = 'CONTROL_PANEL_SIZE_CHANGE';
export const CONTROL_PANEL_TOGGLE = 'CONTROL_PANEL_TOGGLE';
export const CHANGE_CHECKED_RATINGS = 'CHANGE_CHECKED_RATINGS';
export const CHANGE_CHECKED_GENRES = 'CHANGE_CHECKED_GENRES';
export const SET_SORT_BY = 'SET_SORT_BY';
export const TOGGLE_SORT_ORDER = 'TOGGLE_SORT_ORDER';
export const CHANGE_PAGE_BY_ONE = 'CHANGE_PAGE_BY_ONE';
export const SEND_PAGE_TO_END = 'SEND_PAGE_TO_END';
export const OPEN_EDIT_FORM = 'OPEN_EDIT_FORM';
export const CLOSE_EDIT_FORM = 'CLOSE_EDIT_FORM';

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
        payload: createErrorMessage(
          err,
          'There was a problem while retrieving movies'
        ),
      })
    );
};

export const addMovie = info => dispatch => {
  dispatch({ type: LOADING });
  const {
    title,
    year: yearString,
    genre,
    rating,
    run_time: runTimeObject,
    main_actors,
  } = info;
  const year = Number(yearString);
  const run_time = runTimeObjectToSeconds(runTimeObject);
  const requestObject = { title, year, genre, rating, run_time };
  for (let [key, value] of Object.entries(requestObject)) {
    if (!value) {
      return dispatch({ type: ERROR, payload: `Missing field: ${key}` });
    }
  }
  if (main_actors.length) {
    requestObject.main_actors = main_actors;
  }
  axios
    .post(
      `https://homework.eegapis.com/movies?api_key=${process.env.REACT_APP_API_KEY}`,
      requestObject
    )
    .then(res => dispatch({ type: ADD_MOVIE, payload: res.data }))
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: createErrorMessage(
          err,
          'There was a problem while adding movie'
        ),
      })
    );
};

export const editMovie = info => dispatch => {
  dispatch({ type: LOADING });
  const {
    movie_id,
    title,
    year: yearString,
    genre,
    rating,
    run_time: runTimeObject,
    main_actors,
  } = info;
  const year = Number(yearString);
  const run_time = runTimeObjectToSeconds(runTimeObject);
  const requestObject = { movie_id, title, year, genre, rating, run_time };
  for (let [key, value] of Object.entries(requestObject)) {
    if (!value) {
      return dispatch({ type: ERROR, payload: `Missing field: ${key}` });
    }
  }
  if (main_actors.length) {
    requestObject.main_actors = main_actors;
  }
  axios
    .put(
      `https://homework.eegapis.com/movies/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}`,
      requestObject
    )
    .then(res =>
      dispatch({ type: EDIT_MOVIE, payload: { ...res.data, movie_id } })
    )
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: createErrorMessage(
          err,
          'There was a problem while editing movie'
        ),
      })
    );
};

export const deleteMovie = movie_id => dispatch => {
  dispatch({ type: LOADING });
  axios
    .delete(
      `https://homework.eegapis.com/movies/${movie_id}?api_key=${process.env.REACT_APP_API_KEY}`
    )
    .then(res => dispatch({ type: DELETE_MOVIE, payload: movie_id }))
    .catch(err =>
      dispatch({
        type: ERROR,
        payload: createErrorMessage(
          err,
          'There was a problem while deleting movie'
        ),
      })
    );
};

export const clearError = () => dispatch => {
  dispatch({ type: CLEAR_ERROR });
};

export const searchMovies = query => dispatch => {
  dispatch({ type: MOVIE_SEARCH, payload: query });
};

export const changeTabIndex = n => dispatch => {
  dispatch({ type: CHANGE_TAB_INDEX, payload: n });
};

export const changeControlPanelHeight = height => dispatch => {
  dispatch({ type: CONTROL_PANEL_HEIGHT_CHANGE, payload: height });
};

export const controlPanelToggle = () => dispatch => {
  dispatch({ type: CONTROL_PANEL_TOGGLE });
};

export const changeCheckedRatings = rating => dispatch => {
  dispatch({ type: CHANGE_CHECKED_RATINGS, payload: rating });
};

export const changeCheckedGenres = genre => dispatch => {
  dispatch({ type: CHANGE_CHECKED_GENRES, payload: genre });
};

export const setSortBy = name => dispatch => {
  dispatch({ type: SET_SORT_BY, payload: name });
};

export const toggleSortOrder = () => dispatch => {
  dispatch({ type: TOGGLE_SORT_ORDER });
};

export const changePageByOne = forward => dispatch => {
  dispatch({ type: CHANGE_PAGE_BY_ONE, payload: forward });
};

export const sendPageToEnd = forward => dispatch => {
  dispatch({ type: SEND_PAGE_TO_END, payload: forward });
};

export const openEditForm = movie => dispatch => {
  dispatch({ type: OPEN_EDIT_FORM, payload: movie });
};

export const closeEditForm = () => dispatch => {
  dispatch({ type: CLOSE_EDIT_FORM });
};

function createErrorMessage(error, defaultMessage = 'An error occurred') {
  if (error.response && error.response.data) {
    return error.response.data.message;
  }
  return defaultMessage;
}

function runTimeObjectToSeconds(obj) {
  return obj.hours * 3600 + obj.minutes * 60 + obj.seconds;
}
