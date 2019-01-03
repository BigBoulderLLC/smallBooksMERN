import axios from 'axios';
import { REGISTER, REGISTERING, LOGGING_IN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN } from '../actions/types';


function requestLogin(credentials) {
  return {
    type: LOGIN,
    isFetching: true,
    isAuthenticated: false,
    credentials
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    id_token: user.id_token
  }
}

function rejectLogin(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export const register = registrationDetails => dispatch => {
  dispatch(setRegistering());
  axios
    .post('/api/account/register', registrationDetails)
    .then(res => dispatch({
      type:REGISTER,
      payload: res.data
    }))
}

export const setRegistering = () => {
  return {
    type: REGISTERING
  }
}

export const login = loginDetails => dispatch => {
  let request = requestLogin(loginDetails)
  let response = {}
  dispatch(request)
  axios
    .post('/api/account/login', request)
    .then(res => {
      response = receiveLogin(res.data)

      /* Save response in local storage */ 
      localStorage.setItem('id_token', res.data.id_token)
      localStorage.setItem('access_token', res.data.access_token)

      /* Dispatch the response to redux */
      dispatch(response)
    })
    .catch(err => {
      response = rejectLogin(err)
      return Promise.reject(err)
    })
}

export const setLoggingIn = () => {
  return {
    type: LOGGING_IN
  }
}