import axios from 'axios';
import { REGISTER, REGISTERING } from '../actions/types';

export const register = loginDetails => dispatch => {
  dispatch(setRegistering());
  axios
    .post('/api/account/register', loginDetails)
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