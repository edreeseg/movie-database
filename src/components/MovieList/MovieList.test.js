import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import MovieList from './index';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../redux/reducers';

const mockStore = configureStore([thunk]);

const exampleMovie = {
  movie_id: '1',
  title: 'Test Title',
  genre: 'Action',
  year: 2020,
  run_time: 7200,
  rating: 'G',
  main_actors: ['Actor 1', 'Actor 2', 'Actor 3'],
};

describe('MovieList functionality', () => {
  let store;
  it('Renders without crashing', () => {
    store = mockStore({ ...initialState, loading: false });

    const component = render(
      <Provider store={store}>
        <MovieList />
      </Provider>
    );
  });
  it('Displays movie list passed as prop', () => {
    store = mockStore({
      ...initialState,
      loading: false,
      movies: [exampleMovie],
    });
    const { getAllByText } = render(
      <Provider store={store}>
        <MovieList />
      </Provider>
    );
    getAllByText(exampleMovie.title);
  });
  it('Does not display more than ten movies at a time', () => {
    const movieList = Array(11)
      .fill(exampleMovie)
      .map((movie, index) => {
        return {
          ...movie,
          movie_id: String(index),
          title: `Test Title ${index + 1}`,
        };
      });
    store = mockStore({ ...initialState, loading: false, movies: movieList });
    const { getAllByText, queryByText } = render(
      <Provider store={store}>
        <MovieList />
      </Provider>
    );
    getAllByText(/Test Title 10/i);
    expect(queryByText(/Test Title 11/i)).toBeNull();
  });
  it('Displays appropriate page', () => {
    const movieList = Array(11)
      .fill(exampleMovie)
      .map((movie, index) => {
        return {
          ...movie,
          movie_id: String(index),
          title: `Test Title ${index + 1}`,
        };
      });
    store = mockStore({
      ...initialState,
      loading: false,
      movies: movieList,
      pageNumber: 2,
    });

    const { getAllByText, queryByText } = render(
      <Provider store={store}>
        <MovieList />
      </Provider>
    );
    getAllByText(/Test Title 11/i);
    expect(queryByText(/Test Title 10/i)).toBeNull();
  });
});
