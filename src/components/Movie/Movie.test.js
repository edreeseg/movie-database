import React from 'react';
import { render } from '@testing-library/react';
import Movie from './index';

const defaultProps = {
  movie_id: 1,
  title: 'Test Title',
  genre: 'Action',
  year: 2020,
  run_time: 7200,
  rating: 'G',
  main_actors: ['Actor 1', 'Actor 2', 'Actor 3'],
};

describe('Movie component functionality', () => {
  it('Renders without crashing', () => {
    render(<Movie {...defaultProps} />);
  });
  it('Displays all movie information', () => {
    const { getByText } = render(<Movie {...defaultProps} />);
    getByText(defaultProps.title);
    getByText(defaultProps.genre);
    getByText(defaultProps.year);
    getByText(defaultProps.rating);
    for (let actor of defaultProps.main_actors) getByText(actor);
    const hours = defaultProps.run_time / 3600;
    const minutes = (defaultProps.run_time - hours * 3600) / 60;
    const seconds = defaultProps.run_time - hours * 3600 - minutes * 60;
    const runtime = [hours, minutes, seconds];
    for (let value of runtime) {
      if (String(value).length === 1) value = '0' + value;
    }
    getByText(runtime.join(':'));
  });
});
