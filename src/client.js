import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Root from './app/Root';
import createAppStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import getRoutes from './routes';

const client = new ApiClient();

const render = () => {
  createAppStore(browserHistory, client, window.__data, (store) => {
    console.log('store', store);
    const history = syncHistoryWithStore(browserHistory, store);

    const mountPoint = document.getElementById('content');

    ReactDOM.render(
      <Root>
        <Provider store={store}>
          { getRoutes(history, store) }
        </Provider>
      </Root>,
      mountPoint
    );
  });
};

render();

if (__DEVELOPMENT__ && module.hot) {
  module.hot.accept('./app/Root', () => {
    render();
  });
}
