import React from 'react';
import { Router, IndexRoute, Route } from 'react-router';
import { isAuthorized } from './redux/reducers/auth';

import App from './app/App';
import Layout from './app/Layout';
import {
  Dashboard,
  Login,
  Disputes,
  Dispute,
  Users,
  Moderation,
  DisputeModeration,
  NotFound } from './views/pages';

export default (history, store) => {
  const requireLogin = (nextState, replace, cb) => {
    function checkAuth() {
      const { auth } = store.getState();
      if (!isAuthorized(auth)) {
        // oops, not logged in, so can't be here!
        replace('/login');
      }
      cb();
    }
    checkAuth();
  };

  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Dashboard} onEnter={requireLogin} />

        <Route component={Login} path="login" />

        { /* Private layout */ }
        <Route onEnter={requireLogin} component={Layout}>
          <Route path="disputes">
            <IndexRoute component={Disputes} />
            <Route path="create" component={Dispute} />
            <Route path="id/:id" component={Dispute} />
          </Route>
          <Route path="moderation">
            <IndexRoute component={Moderation} />
            <Route path="id/:id" component={DisputeModeration} />
          </Route>
          <Route path="users" component={Users} />
          <Route path="moderation" component={Moderation} />
        </Route>

        { /* Catch all route */ }
        <Route path="*" component={NotFound} status={404} />
      </Route>
    </Router>
  );
};
