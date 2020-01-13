import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducer from './redux/reducers';
import App from './App';
const middleware = [thunk];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger);
}
const store = createStore(reducer, applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <App />
  </Provider>,
  // In the event a root element is not available, we are testing.  In which case, we
  // create a div element to which we will render the component
  document.getElementById('root') || document.createElement('div')
);
