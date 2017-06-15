// import {
//   send as sendToSlack,
//   prepareSlackAPIErrorMessage
// } from '../../helpers/slackLogger';

// import { broadcast } from '../../helpers/proxy';

import { logout } from '../../reducers/auth';

export default function apiClientMiddleware(client) {
  return store => (
    next => (action) => {
      const { dispatch, getState } = store;
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { promise, types, ...rest } = action;

      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({ ...rest, type: REQUEST });

      const token = getState().auth.accessToken;
      if (typeof token === 'string') {
        client.setHeader('Authorization', token);
      }
      const actionPromise = promise(client);

      actionPromise.then(
        (result) => {
          next({ ...rest, data: (result.body.data || result.body), type: SUCCESS });
        },
        (errorResponse) => {
          const response = errorResponse.response;
          let error = '';
          if (response.body) {
            error = response.body.error;
          } else if (response.text) {
            error = response.text;
          } else {
            error = response;
          }

          if (response.statusCode && response.statusCode === 401) {
            if (token !== null) {
              store.dispatch(logout());
            }
          }
          // sendToSlack(prepareSlackAPIErrorMessage(errorResponse));
          next({ ...rest, error, type: FAILURE });
        }
      ).catch((error) => {
        console.error('API MIDDLEWARE ERROR:', error);
        // sendToSlack(error.stack);
        next({ ...rest, error, type: FAILURE });
      });

      return actionPromise;
    }
  );
}
