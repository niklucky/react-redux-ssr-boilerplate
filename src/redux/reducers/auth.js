const LOAD = 'auth/LOAD';
const LOAD_SUCCESS = 'auth/LOAD_SUCCESS';
const LOAD_FAIL = 'auth/LOAD_FAIL';

const LOGIN = 'auth/LOGIN';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth/LOGIN_FAIL';

const REGISTER = 'auth/REGISTER';
const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
const REGISTER_FAIL = 'auth/REGISTER_FAIL';

const LOGOUT = 'auth/LOGOUT';
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'auth/LOGOUT_FAIL';

const initialState = {
  isLoggingIn: false,
  isLoggedIn: false,
  isLoggingOut: false,
  isLoggedOut: false,
  isRegistering: false,
  isRegistered: false,

  error: {
    register: null,
    login: null,
    forgotPassword: null
  },
  accessToken: null,
  userId: null,
  username: null
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
        accessToken: action.data.accessToken,
        userId: action.data.user.id,
        locale: action.data.user.locale,
        user: action.data.user,
      };
    case LOAD_FAIL:
      return {
        ...state,
        isLoading: false,
        isLoaded: false,
        error: action.error
      };
    case LOGIN:
      return {
        ...state,
        isLoggingIn: true,
        error: {
          register: null,
          login: null,
          forgotPassword: null
        }
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: true,
        isLoggedOut: false,
        accessToken: action.data.accessToken,
        userId: action.data.user.id,
        user: action.data.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggingIn: false,
        isLoggedIn: false,
        error: {
          register: null,
          login: action.error.message,
          forgotPassword: null
        }
      };
    case REGISTER:
      return {
        ...state,
        isRegistering: true,
        error: {
          register: null,
          login: null,
          forgotPassword: null
        },
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRegistering: false,
        isRegistered: true,
        isLoggedIn: true,
        accessToken: action.data.accessToken,
        userId: action.data.user.id,
        user: action.data.user,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isRegistering: false,
        isRegistered: false,
        error: {
          register: action.error,
          login: null,
          forgotPassword: null
        }
      };
    case LOGOUT:
      return {
        ...state,
        isLoggingOut: true,
        error: {
          register: null,
          login: null,
          forgotPassword: null
        },
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isLoggedIn: false,
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
        error: {
          register: null,
          login: null,
          forgotPassword: null
        }
      };
    default:
      return state;
  }
}

export function load(token) {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: client => client.get('/auth-api/access-token', { params: { token }})
  };
}

export function isAuthorized(state) {
  if (state.accessToken === null || state.userId === null) {
    return false;
  }
  return true;
}

export function login(data) {
  return {
    types: [LOGIN, LOGIN_SUCCESS, LOGIN_FAIL],
    promise: client => client.post('/auth-api/login', { data })
  };
}

export function register(payload) {
  const data = {
    ...payload,
    email: payload.username,
    key: '599AA191-9FEA-BC1A39C2100A9DE7B3234A0857633C53-439B-BD87-96F0E85B1ABE'
  };
  return {
    types: [REGISTER, REGISTER_SUCCESS, REGISTER_FAIL],
    promise: client => client.post('/auth-api/register', { data })
  };
}

export function update(username, payload) {
  return register({...payload, username });
}

export function logout(token) {
  return {
    types: [LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAIL],
    promise: client => client.del('/auth-api/logout', { params: { token } })
  };
}

export function isAuthLoaded(auth) {
  if (auth.isLoaded === false && auth.isLoading === false) {
    return false;
  } else if (!auth.userId) {
    return false;
  }
  return true;
}

export function isExistsToken(auth) {
  return !!auth.accessToken;
}

export function getAuthToken(auth) {
  if (typeof auth.accessToken === 'string') {
    return auth.accessToken;
  }
  if (__SERVER__) {
    if (global && global.__SID__) {
      return global.__SID__;
    }
  }
  return null;
}

export function logError(type, description) {
  if (description) {
    if (type === 'register') {
      return {
        type: REGISTER_FAIL,
        error: description
      };
    } else if (type === 'login') {
      return {
        type: LOGIN_FAIL,
        error: description
      };
    }
  }
  return null;
}
