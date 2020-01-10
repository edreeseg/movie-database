import {
  ERROR,
  LOADING,
  GET_MOVIES,
  ADD_MOVIE,
  EDIT_MOVIE,
  DELETE_MOVIE,
} from './actions';

const initialState = {
  movies: [],
  originalList: [],
  sortValue: null,
  orderIsDescending: true,
  pageNumber: 1,
  checkedGenres: initialGenresChecked,
  checkedRatings: initialRatingsChecked,
  controlPanelOpen: false,
  controlPanelHeight: 0,
  taxIndex: 0,
  error: null,
  loading: true,
};
// Keep track of the status of the control panel, to translate main content further down
// page when needed.
//   const [controlPanelOpen, setControlPanelOpen] = useState(false);
//   const [controlPanelHeight, setControlPanelHeight] = useState(0);
//   const [tabIndex, setTabIndex] = useState(0);
//   // Loading boolean, for awaiting HTTP responses.
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return { ...state, loading: false, error: action.payload };
    case LOADING:
      return { ...state, loading: true };
    case GET_MOVIES:
      return {
        ...state,
        loading: false,
        movies: action.payload,
        originalList: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
