import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import createMiddleware from './store/middlewares/clientMiddleware';

export default function createAppStore(history, client, reduxState, onSuccess) {
  const middlewares = [createMiddleware(client), routerMiddleware(history)];
  let composed;

  if (__DEVELOPMENT__ && __CLIENT__ && __DEVTOOLS__) {
    const createLogger = require('redux-logger');
    const logger = createLogger({
      predicate: () => true,
      collapsed: true,
      duration: true,
    });
    middlewares.push(logger);

    composed = compose(
      applyMiddleware(...middlewares),
      autoRehydrate(),
      // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
  } else {
    composed = compose(
      applyMiddleware(...middlewares),
      autoRehydrate()
    );
  }
  const reducer = require('./reducers');
  const store = createStore(reducer, reduxState, composed);
  if (__CLIENT__) {
    persistStore(store, {}, () => {
      if (onSuccess) {
        onSuccess(store);
      }
    });
  }
  if (__DEVELOPMENT__ && module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default);
    });
  }

  return store;
}
