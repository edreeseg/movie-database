import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Movie from './index';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../redux/reducers';

const mockStore = configureStore([thunk]);

const defaultProps = {
  data: {
    movie_id: '1',
    title: 'Test Title',
    genre: 'Action',
    year: 2020,
    run_time: 7200,
    rating: 'G',
    main_actors: ['Actor 1', 'Actor 2', 'Actor 3'],
  },
};

describe('Movie component functionality', () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it('Renders without crashing', () => {
    render(
      <Provider store={store}>
        <Movie {...defaultProps} />
      </Provider>
    );
  });
  it('Displays all movie information', () => {
    const { getByText, getAllByText } = render(
      <Provider store={store}>
        <Movie {...defaultProps} />
      </Provider>
    );
    getAllByText(defaultProps.data.title);
    getAllByText(defaultProps.data.genre);
    const yearRegExp = new RegExp(String(defaultProps.data.year), 'gi');
    getAllByText(yearRegExp);
    getAllByText(defaultProps.data.rating);
    getAllByText(defaultProps.data.main_actors.join(', '));
    const hours = defaultProps.data.run_time / 3600;
    const minutes = (defaultProps.data.run_time - hours * 3600) / 60;
    const seconds = defaultProps.data.run_time - hours * 3600 - minutes * 60;
    const runtime = [hours, minutes, seconds];
    for (let i = 0; i < runtime.length; i++) {
      if (String(runtime[i]).length === 1) {
        runtime[i] = '0' + runtime[i];
      }
    }
    getAllByText(runtime.join(':'));
  });
});
