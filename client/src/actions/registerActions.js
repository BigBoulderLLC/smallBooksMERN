import axios from 'axios';
import { REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN, LOGOUT,/* LOGOUT_FAILURE,*/ LOGOUT_SUCCESS } from '../actions/types';


function requestLogin(credentials) {
  return {
    type: LOGIN,
    isFetching: true,
    isAuthenticated: false,
    username:credentials.username,
    password:credentials.password
  }
}

function receiveLogin(username) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    username: username
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

function requestLogout() {
  return {
    type:LOGOUT,
    isFetching:true,
    isAuthenticated:true
  }
}

function receiveLogout() {
  return {
    type:LOGOUT_SUCCESS,
    isFetching:false,
    isAuthenticated:false
  }
}

function requestRegistration(credentials) {
  return {
    type:REGISTER,
    isFetching:true,
    isAuthenticated:false,
    credentials
  }
}

function receiveRegistration() {
  return {
    type:REGISTER_SUCCESS,
    isFetching:false,
    isAuthenticated:true
  }
}

function rejectRegistration(err) {
  return {
    type:REGISTER_FAILURE,
    isFetching:false,
    isAuthenticated:false,
    err
  }
}

export const register = registrationDetails => dispatch => {
  let request = requestRegistration(registrationDetails)
  dispatch(request);
  let response = {}
  axios
    .post('/api/account/register', registrationDetails)
    .then(res => {
      response = res
      if (res.data.success) {
        let token = res.data.token
        localStorage.setItem('token', token)
        dispatch(receiveRegistration())
      } else {
        dispatch(rejectRegistration("Registration failed"))
      }
    })
    .catch(err => {
      response = err
      dispatch(rejectRegistration(err))
    })
  return response
}

export const logout = dispatch => {
  dispatch(requestLogout())
  localStorage.removeItem('token')
  dispatch(receiveLogout())
}

export const login = loginDetails => dispatch => {
  let request = requestLogin(loginDetails)
  let response = {}
  dispatch(request)
  axios
    .post('/api/account/login', request)
    .then(res => {
      if (res.data.success) {
        response = receiveLogin(res.data.username)
        /* Save token in local storage */ 
        localStorage.setItem('token', res.data.token)
        console.log("Local storage contains a token: " + localStorage.getItem('token'))
        console.log(localStorage)
        /* Dispatch the response to redux */
        dispatch(response)
      } else {
        response = rejectLogin(res.data.message)
        dispatch(response)
      }
      
    })
    .catch(err => {
      response = rejectLogin(err)
      dispatch(response)
    })
}