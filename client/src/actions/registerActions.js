import axios from 'axios';
import { REGISTER, REGISTERING, LOGGINGIN, LOGIN } from '../actions/types';

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
  dispatch(setLoggingIn());
  axios
    .post('/api/account/login', loginDetails)
    .then(res => dispatch({
      type:LOGIN,
      payload: res.data
    }))
}

export const setLoggingIn = () => {
  return {
    type: LOGGINGIN
  }
}