const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';

const LOGOUT = 'auth/LOGOUT';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL';

const initialState = {
  isLoggingIn: false,
  isLoggedIn: false,
  isLoggingOut: false,
  isLoggedOut: false,

  error: null,
  accessToken: null,
  userId: null,
  username: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLoggingIn: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        accessToken: action.data.accessToken,
        userId: action.data.user.id,
        user: action.data.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        error: action.error
      };
    case LOGOUT:
      return {
        ...state,
        isLoggingOut: true,
        error: null,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isLoggedOut: true,
        accessToken: null,
        userId: null,
        username: null,
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        isLoggingOut: false,
        isLoggedOut: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isAuthorized(state) {
  if (state.accessToken === null || state.userId === null) {
    return false;
  }
  return true;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/auth')
  };
}
export function login(data) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: client => client.post('/auth/login', { data })
  };
}

export function logout() {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: client => client.del('/auth/logout')
  };
}
