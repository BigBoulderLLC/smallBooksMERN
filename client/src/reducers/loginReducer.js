import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/types';

export default function(state = {
  isFetching: false,
  isAuthenticated: localStorage.getItem('id_token') ? true : false
}, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        user: action.credentials
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: true,
        errorMessage: ''
      }
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching:false,
        isAuthenticated: false,
        errorMessage: action.message
      }
    default:
      return state
  }
}