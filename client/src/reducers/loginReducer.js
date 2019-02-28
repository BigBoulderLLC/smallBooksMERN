import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE } from '../actions/types';

const initialState = { 
  isFetching: false,
  isRegistration: false,
  isAuthenticated: true,
  token: null,
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isFetching: true,
        isRegistration: false,
        isAuthenticated: false,
        token: null,
        error: null
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: true,
        isRegistration: false,
        isAuthenticated: true,
        token: action.payload.token,
        error: null
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isRegistration: false,
        isAuthenticated: false,
        token: null,
        error: action.payload.error
      }
    case LOGOUT:
      return {
        ...state,
        isFetching: false,
        isRegistration: false,
        isAuthenticated: false,
        token: null,
        error: null
      }
    case REGISTER:
      return {
        ...state,
        isFetching: true,
        isRegistration: true,
        isAuthenticated: false,
        token: null,
        error: false
      }
    case REGISTER_SUCCESS: 
      return {
        ...state,
        isFetching: false,
        isRegistration: true,
        isAuthenticated: true,
        token: action.payload.token,
        error: null
      }
    case REGISTER_FAILURE: 
      return {
        ...state,
        isFetching: false,
        isRegistration: true,
        isAuthenticated: false,
        token: null,
        error: action.payload.error
      }
    default:
      return state
  }
};