import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import ControlPanel from './index';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { initialState } from '../../redux/reducers';

const mockStore = configureStore([thunk]);

describe('Control Panel functionality', () => {
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
  });
  it('Renders without crashing', () => {
    const component = render(
      <Provider store={store}>
        <ControlPanel />
      </Provider>
    );
  });
});
