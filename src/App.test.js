import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from './redux/reducers';

const mockStore = configureStore([thunk]);

describe('App functionality', () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it('renders without crashing', () => {
    const component = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
