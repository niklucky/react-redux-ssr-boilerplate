import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
    <BrowserRouter>
      <div>
        <DefaultLayout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/my" component={MyAccount} requireLogin={requireLogin} />

            <Route path="*" component={NotFound} status={404} />
          </Switch>
        </DefaultLayout>
      </div>
    </BrowserRouter>
  );
};
