import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Fuse from 'fuse.js';
import {
  NavBar,
  ControlPanel,
  MovieList,
  PageSelect,
  AddMovie,
} from './components';
import {
  initialRatingsChecked,
  initialGenresChecked,
} from './components/ControlPanel/panelSetup';

const listContainerStyles = makeStyles(theme => ({
  root: props => ({
    transition: 'transform .3s',
    // Translate container down when control panel opens
    transform: `translateY(${
      props.controlPanelOpen ? props.controlPanelHeight : '0'
    }px)`,
    paddingTop: '70px',
  }),
}));

function App() {
  const [movies, setMovies] = useState([]);
  // Original order of movies will be preserved in `originalList`.
  const [originalList, setOriginalList] = useState([]);
  const [sortInEffect, setSortInEffect] = useState(false);
  const [sortValue, setSortValue] = useState(null);
  const [orderIsDescending, setOrderIsDescending] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  // Keep track of which ratings and genres have been selected by user.
  const [checkedGenres, setCheckedGenres] = useState(initialGenresChecked);
  const [checkedRatings, setCheckedRatings] = useState(initialRatingsChecked);
  // String kept in state and passed as a prop for use in a controlled input
  // located on ControlPanel.
  const [searchQuery, setSearchQuery] = useState('');
  // Keep track of the status of the control panel, to translate main content further down
  // page when needed.
  const [controlPanelOpen, setControlPanelOpen] = useState(false);
  const [controlPanelHeight, setControlPanelHeight] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  // Loading boolean, for awaiting HTTP responses.
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(
        `https://homework.eegapis.com/movies?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then(res => {
        setOriginalList(res.data.movies);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    // Effect will run whenever originalList is changed, running search form function
    // which will check if further criteria must be considered before displaying list
    handleSearchFormSubmit();
  }, [originalList]);
  const listContainerClasses = listContainerStyles({
    controlPanelOpen,
    controlPanelHeight,
  });
  // Configuring search options for use with fuse.js
  const searchOptions = {
    shouldSort: true,
    threshold: 0.6,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 2,
    keys: ['title', 'main_actors'],
  };
  const filterMovies = arr => {
    return arr.filter(movie => {
      return checkedRatings.get(movie.rating) && checkedGenres.get(movie.genre);
    });
  };
  const sortMovies = arr => {
    // Copy array to avoid mutating original when using .sort
    const copy = [...arr];
    switch (sortValue) {
      case 'A-Z':
        return copy.sort((a, b) => {
          if (orderIsDescending) {
            return a.title > b.title ? 1 : -1;
          }
          return b.title > a.title ? 1 : -1;
        });
      case 'Year':
        return copy.sort((a, b) =>
          orderIsDescending ? a.year - b.year : b.year - a.year
        );
      case 'Runtime':
        return copy.sort((a, b) =>
          orderIsDescending ? a.run_time - b.run_time : b.run_time - a.run_time
        );
      case 'Rating':
        return copy.sort((a, b) => {
          const ratings = {
            G: 1,
            PG: 2,
            'PG-13': 3,
            R: 4,
            'NC-17': 5,
          };
          if (orderIsDescending) {
            return ratings[a.rating] - ratings[b.rating];
          }
          return ratings[b.rating] - ratings[a.rating];
        });
      default:
        throw new Error('Sort function called with invalid type.');
    }
  };
  function handleSearchFormSubmit(ev) {
    if (ev) {
      ev.preventDefault();
    }
    // Check for no search/sort/filter criteria, to avoid needing to filter through
    // entire movie list unnecessarily.  Could also use a for...of loop to iterate over
    // the Map iterator and avoid having to convert to an array.
    const ratingsUnchecked = [...checkedRatings.values()].includes(false);
    const genresUnchecked = [...checkedGenres.values()].includes(false);
    if (!ratingsUnchecked && !genresUnchecked && !sortValue && !searchQuery) {
      return setMovies([...originalList]);
    }
    // Filter array first based on selected checkboxes
    const filteredArr = filterMovies(originalList);
    // Check if searchQuery is long enough to justify factoring it in
    if (searchQuery.length > 1) {
      const fuse = new Fuse(filteredArr, searchOptions);
      const searchResult = fuse.search(searchQuery);
      // If so, double check if the user has indicated they want results sorted
      // and set the result in state.
      return setMovies(sortValue ? sortMovies(searchResult) : searchResult);
    }
    // If not, simply do the same with the array returned by filterMovies.
    setMovies(sortValue ? sortMovies(filteredArr) : filteredArr);
  }
  const addMovie = info => {
    setLoading(true);
    const {
      title,
      year: yearString,
      genre,
      rating,
      run_time: run_obj,
      main_actors,
    } = info;
    const run_time =
      run_obj.hours * 3600 + run_obj.minutes * 60 + Number(run_obj.seconds);
    const year = Number(yearString);
    if (
      !title ||
      !year ||
      Number.isNaN(year) ||
      !genre ||
      !rating ||
      !run_time
    ) {
      // Handle error.
      return;
    }
    const requestObject = { title, year, genre, rating, run_time };
    if (main_actors.length) requestObject.main_actors = main_actors;
    axios
      .post(
        `https://homework.eegapis.com/movies?api_key=${process.env.REACT_APP_API_KEY}`,
        requestObject
      )
      .then(res => {
        setOriginalList(prev => [...prev, res.data]);
        setTabIndex(0);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };
  const deleteMovie = id => {
    setLoading(true);
    axios
      .delete(
        `https://homework.eegapis.com/movies/${id}?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then(res => {
        const filterMovie = movie => movie.movie_id !== id;
        setOriginalList(prev => prev.filter(filterMovie));
        setLoading(false);
      });
  };
  // Define props for control panel in advance and spread, to make JSX more readable.
  const controlPanelProps = {
    controlPanelOpen,
    setControlPanelOpen,
    setControlPanelHeight,
    sortValue,
    setSortValue,
    orderIsDescending,
    setOrderIsDescending,
    checkedGenres,
    checkedRatings,
    setCheckedRatings,
    setCheckedGenres,
    searchQuery,
    setSearchQuery,
    handleSearchFormSubmit,
  };
  return (
    <>
      <NavBar tabIndex={tabIndex} setTabIndex={setTabIndex} />
      <ControlPanel {...controlPanelProps} />
      <Container classes={listContainerClasses}>
        <PageSelect
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
          pageTotal={Math.floor(movies.length / 10) || 1}
        />
        {tabIndex ? (
          <AddMovie addMovie={addMovie} loading={loading} />
        ) : (
          <MovieList
            movies={movies}
            pageNumber={pageNumber}
            loading={loading}
          />
        )}
      </Container>
    </>
  );
}

export default App;
