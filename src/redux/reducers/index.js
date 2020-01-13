import {
  ERROR,
  CLEAR_ERROR,
  LOADING,
  GET_MOVIES,
  UPDATE_MOVIE_LIST,
  ADD_MOVIE,
  EDIT_MOVIE,
  DELETE_MOVIE,
  MOVIE_SEARCH,
  CHANGE_SEARCH_QUERY,
  CHANGE_TAB_INDEX,
  CONTROL_PANEL_HEIGHT_CHANGE,
  CONTROL_PANEL_TOGGLE,
  CHANGE_CHECKED_RATINGS,
  CHANGE_CHECKED_GENRES,
  SET_SORT_BY,
  TOGGLE_SORT_ORDER,
  CHANGE_PAGE_BY_ONE,
  SEND_PAGE_TO_END,
  OPEN_EDIT_FORM,
  CLOSE_EDIT_FORM,
} from '../actions';

import { getDerivedListFromOptions } from '../selectors';

const ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
const genres = [
  'action',
  'comedy',
  'drama',
  'fantasy',
  'horror',
  'musical',
  'romance',
];

// `originalList` represents the full, unaltered list of movies.
// `movies` represents the list of movies representative of the currently
// entered options, and is only updated based on `originalList`, leveraging
// memoization through reselect library.

export const initialState = {
  movies: [],
  originalList: [],
  sortBy: null,
  orderIsDescending: true,
  pageNumber: 1,
  searchQuery: '',
  checkedGenres: new Map(genres.map(rating => [rating, true])),
  checkedRatings: new Map(ratings.map(rating => [rating, true])),
  controlPanelOpen: false,
  controlPanelHeight: 0,
  tabIndex: 0,
  error: null,
  loading: true,
  editing: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null };
    case LOADING:
      return { ...state, loading: true };
    case GET_MOVIES:
      return {
        ...state,
        originalList: action.payload,
        loading: false,
        error: null,
      };
    case UPDATE_MOVIE_LIST:
      return { ...state, movies: getDerivedListFromOptions(state) };
    case ADD_MOVIE:
      return {
        ...state,
        originalList: [...state.originalList, action.payload],
        tabIndex: 0,
        controlPanelOpen: false,
        loading: false,
        error: null,
      };
    case EDIT_MOVIE:
      const id = action.payload.movie_id;
      return {
        ...state,
        originalList: state.originalList.map(movie => {
          if (movie.movie_id === id) {
            return action.payload;
          }
          return movie;
        }),
        editing: null,
        loading: false,
        error: null,
      };
    case DELETE_MOVIE:
      return {
        ...state,
        originalList: state.originalList.filter(
          movie => movie.movie_id !== action.payload
        ),
        loading: false,
        error: null,
      };
    case MOVIE_SEARCH:
      return {
        ...state,
        movies: getDerivedListFromOptions(state),
        sortBy: action.payload.length >= 2 ? null : state.sortBy,
        controlPanelOpen: false,
        loading: false,
        error: null,
      };
    case CHANGE_SEARCH_QUERY:
      return { ...state, searchQuery: action.payload };
    case CHANGE_TAB_INDEX:
      return { ...state, tabIndex: action.payload };
    case CONTROL_PANEL_HEIGHT_CHANGE:
      return { ...state, controlPanelHeight: action.payload };
    case CONTROL_PANEL_TOGGLE:
      return { ...state, controlPanelOpen: !state.controlPanelOpen };
    case CHANGE_CHECKED_RATINGS: {
      const prev = state.checkedRatings.get(action.payload);
      return {
        ...state,
        checkedRatings: new Map(state.checkedRatings).set(
          action.payload,
          !prev
        ),
      };
    }
    case CHANGE_CHECKED_GENRES: {
      const prev = state.checkedGenres.get(action.payload);
      return {
        ...state,
        checkedGenres: new Map(state.checkedGenres).set(action.payload, !prev),
      };
    }
    case SET_SORT_BY:
      return {
        ...state,
        sortBy: state.sortBy === action.payload ? null : action.payload,
      };
    case TOGGLE_SORT_ORDER:
      return {
        ...state,
        orderIsDescending: !state.orderIsDescending,
      };
    case CHANGE_PAGE_BY_ONE: {
      const max = Math.ceil(state.movies.length / 10) || 1;
      let newPage = state.pageNumber;
      if (action.payload && state.pageNumber !== max) {
        newPage++;
      } else if (!action.payload && state.pageNumber !== 1) {
        newPage--;
      }
      return {
        ...state,
        pageNumber: newPage,
      };
    }
    case SEND_PAGE_TO_END:
      const max = Math.ceil(state.movies.length / 10) || 1;
      return {
        ...state,
        pageNumber: action.payload ? max : 1,
      };
    case OPEN_EDIT_FORM:
      return { ...state, editing: action.payload };
    case CLOSE_EDIT_FORM:
      return { ...state, editing: null };
    default:
      return state;
  }
};

export default reducer;
