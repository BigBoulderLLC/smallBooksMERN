import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/types';

const initialState = {
  isFetching:false,
  isAuthenticated:false,
  user:null,
  errorMessage:null
}

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: action.username
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        user: action.username,
        errorMessage: ''
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching:false,
        isAuthenticated: false,
        user: null,
        errorMessage: action.message
      }
    default:
      return state
  }
}