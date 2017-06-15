import React from 'react';
import { Router, IndexRoute, Route } from 'react-router';
import { isAuthorized, getAuthToken, isAuthLoaded, load as loadAuth } from './redux/reducers/auth';
import { Default as DefaultLayout } from './views/layouts';
import {
  Home,
  Login,
  Register,
  NotFound,
  MyAccount,
  ForgotPassword
} from './views/pages';

export default (history, store) => {
  const requireLogin = (nextState, replace, next) => {
    function checkAuth() {
      const { auth } = store.getState();
      if (!isAuthorized(auth)) {
        // oops, not logged in, so can't be here!
        replace('/login');
      }
      next();
    }

    const { auth } = store.getState();
    const token = getAuthToken(auth);
    if (token && !isAuthLoaded(auth)) {
      store.dispatch(loadAuth(token))
        .then(checkAuth)
        .catch(e => console.log('Auth error: ', e));
    } else {
      checkAuth();
    }
  };

  // Please keep routes in alphabetical order
  return (
    <Router onUpdate={() => { window.scrollTo(0, 0); }} history={history}>
      <Route path="/" component={DefaultLayout}>
        <IndexRoute component={Home} />
      </Route>
      <Route component={DefaultLayout}>
        <Route path="forgot-password" component={ForgotPassword} />
        <Route path="login" component={Login} />
        <Route path="register" component={Register} />

        <Route path="my" onEnter={requireLogin}>
          <IndexRoute component={MyAccount} />
        </Route>
        <Route path="*" component={NotFound} status={404} />
      </Route>
    </Router>
  );
};
