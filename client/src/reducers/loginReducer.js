import { LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/types';

let token = localStorage.getItem('token')
const initialState = token ? { isAuthenticated: true} : {}

export default function(state = initialState, action) {
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