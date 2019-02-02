import axios from 'axios';
import { REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE, LOGIN_SUCCESS, LOGIN_FAILURE, LOGIN, LOGOUT,/* LOGOUT_FAILURE,*/ LOGOUT_SUCCESS } from '../actions/types';


function requestLogin(credentials) {
  return {
    type: LOGIN,
    isFetching: true,
    isAuthenticated: false,
    user:credentials.username,
    errorMessage:null
  }
}

function receiveLogin(username) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    username: username,
    errorMessage:null
  }
}

function rejectLogin(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    username: null,
    errorMessage:message
  }
}

function requestLogout() {
  return {
    type:LOGOUT,
    isFetching:true,
    isAuthenticated:true,
    username:null,
    errorMessage:null
  }
}

function receiveLogout() {
  return {
    type:LOGOUT_SUCCESS,
    isFetching:false,
    isAuthenticated:false,
    username:null,
    errorMessage:null
  }
}

function requestRegistration(username) {
  return {
    type:REGISTER,
    isFetching:true,
    isAuthenticated:false,
    username:username,
    errorMessage:null
  }
}

function receiveRegistration(username) {
  return {
    type:REGISTER_SUCCESS,
    isFetching:false,
    isAuthenticated:true,
    username:username,
    errorMessage:null
  }
}

function rejectRegistration(err) {
  return {
    type:REGISTER_FAILURE,
    isFetching:false,
    isAuthenticated:false,
    username:null,
    errorMessage:err
  }
}

export const register = registrationDetails => dispatch => {
  let request = requestRegistration(registrationDetails.username)
  dispatch(request);
  let response = {}
  axios
    .post('/api/account/register', registrationDetails)
    .then(res => {
      response = res
      if (res.data.success) {
        dispatch(receiveRegistration(registrationDetails.username))
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
  console.log("Loggin the user out...")
  dispatch(requestLogout());
  dispatch(receiveLogout());
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