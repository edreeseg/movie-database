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

const dummyData = [];
for (let i = 0; i < 100; i++) {
  dummyData.push({
    movie_id: `${i}`,
    title: 'The Lord of the Rings, The Return of the King',
    genre: 'Fantasy',
    year: 2003,
    run_time: 12000,
    rating: 'PG-13',
    main_actors: ['Elijah Wood', 'Ian McKellen', 'Viggo Mortensen'],
  });
}

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
  const [movies, setMovies] = useState(dummyData);
  // `sortedMovies` being truthy will indicate that the user has elected to sort movies.
  // Original order of movies will be preserved in `movies`.
  const [sortedMovies, setSortedMovies] = useState(null);
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
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://homework.eegapis.com/movies?api_key=${process.env.REACT_APP_API_KEY}`
  //     )
  //     .then(res => setMovies(res.data.movies))
  //     .catch(err => console.log(err));
  // }, []);
  useEffect(() => {
    console.log(pageNumber);
  }, [pageNumber]);
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
        return copy.sort((a, b) =>
          orderIsDescending ? a.title - b.title : b.title - a.title
        );
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
  const handleSearchFormSubmit = ev => {
    if (ev.preventDefault) {
      ev.preventDefault();
    }
    // Filter array first based on selected checkboxes
    const filteredArr = filterMovies(movies);
    // Check if searchQuery is long enough to justify factoring it in
    if (searchQuery.length > 1) {
      const fuse = new Fuse(filteredArr, searchOptions);
      const searchResult = fuse.search(searchQuery);
      // If so, double check if the user has indicated they want results sorted
      // and set the result in state.
      return setSortedMovies(sortValue ? sortMovies(movies) : searchResult);
    }
    // If not, simply do the same with the array returned by filterMovies.
    setSortedMovies(sortValue ? sortMovies(filteredArr) : filteredArr);
  };
  const addMovie = info => {
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
    console.log(requestObject);
    // axios
    //   .post(
    //     `https://homework.eegapis.com/movies?api_key=${process.env.REACT_APP_API_KEY}`,
    //     requestObject
    //   )
    //   .then(movie => setMovies(prev => [...prev, movie]))
    //   .catch(err => console.log(err));
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
          pageTotal={Math.floor((sortedMovies || movies).length / 10)}
        />
        {tabIndex ? (
          <AddMovie addMovie={addMovie} />
        ) : (
          <MovieList
            movies={sortedMovies || movies}
            sortedMovies={sortedMovies}
            pageNumber={pageNumber}
            loading={loading}
          />
        )}
      </Container>
    </>
  );
}

export default App;
