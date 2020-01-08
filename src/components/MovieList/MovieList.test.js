import React from 'react';
import { render, getByText } from '@testing-library/react';
import MovieList from './index';

const defaultProps = {
  movies: [],
  pageNumber: 1,
};

const exampleMovie = {
  movie_id: 1,
  title: 'Test Title',
  genre: 'Action',
  year: 2020,
  run_time: 7200,
  rating: 'G',
  main_actors: ['Actor 1', 'Actor 2', 'Actor 3'],
};

describe('MovieList functionality', () => {
  it('Renders without crashing', () => {
    const component = render(<MovieList {...defaultProps} />);
  });
  it('Displays movie list passed as prop', () => {
    const component = render(
      <MovieList {...defaultProps} movies={[exampleMovie]} />
    );
    getByText(exampleMovie.title);
  });
  it('Does not display more than ten movies at a time', () => {
    const movieList = Array(11)
      .fill(exampleMovie)
      .map((movie, index) => {
        return { ...movie, title: `Test Title ${index + 1}` };
      });
    const { getByText, queryByText } = render(
      <MovieList {...defaultProps} movies={movieList} />
    );
    expect(getByText(/Test Title 10/i)).toBeInDocument();
    expect(queryByText(/Test Title 11/i)).toBeNull();
  });
  it('Displays appropriate page', () => {
    const movieList = Array(11)
      .fill(exampleMovie)
      .map((movie, index) => {
        return { ...movie, movie_id: index, title: `Test Title ${index + 1}` };
      });
    const { getByText, queryByText } = render(
      <MovieList {...defaultProps} movies={movieList} />
    );
    expect(getByText(/Test Title 11/i)).toBeInDocument();
    expect(queryByText(/Test Title 10/i)).toBeNull();
  });
});
