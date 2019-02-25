import axios from 'axios';
import { 
  REGISTER, 
  REGISTER_SUCCESS, 
  REGISTER_FAILURE, 
  LOGIN_SUCCESS, 
  LOGIN_FAILURE, 
  LOGIN, 
  LOGOUT,
  USER_PROFILE_SUCCESS, 
  USER_PROFILE_FAILURE 
} from '../actions/types';


function requestLogin() {
  return {
    type: LOGIN
  };
};

function receiveLogin(token) {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token: token,
      error: null
    }
  };
};

function rejectLogin(err) {
  return {
    type: LOGIN_FAILURE,
    payload: {
      token: null,
      error: err
    }
  };
};

function requestLogout() {
  return {
    type: LOGOUT
  };
};

function requestRegistration() {
  return {
    type: REGISTER
  };
};

function receiveRegistration(token) {
  return {
    type: REGISTER_SUCCESS,
    payload: {
      token: token,
      error: null
    }
  };
};

function rejectRegistration(err) {
  return {
    type: REGISTER_FAILURE,
    payload: {
      token: null,
      error: err
    }
  };
};

function receiveUserProfile(profile) {
  return {
    type: USER_PROFILE_SUCCESS,
    payload: {
      profile: profile,
      error: null
    }
  };
};

function rejectUserProfile(err) {
  return {
    type: USER_PROFILE_FAILURE,
    payload: {
      profile: null,
      error: err
    }
  };
};

export const register = registrationDetails => dispatch => {
  /* Store registration request in redux state */
  let request = requestRegistration();
  dispatch(request);

  /* Call rest endpoint to register the account */
  axios.post('/api/account/register', registrationDetails)
  .then(res => {
    if (res.data.success) {
      /* Store token in login store and user profile in profile store */
      const token = res.data.token;
      const profile = res.data._doc;
      dispatch(receiveRegistration(token));
      dispatch(receiveUserProfile(profile));
    } else {
      const error = "Registration failed";
      dispatch(rejectRegistration(error));
      dispatch(rejectUserProfile(error));
    }
  })
  .catch(err => {
    dispatch(rejectRegistration(err));
    dispatch(rejectUserProfile(err));
  });
};

export const logout = dispatch => {
  dispatch(requestLogout());
};

export const login = loginDetails => dispatch => {
  let request = requestLogin(loginDetails);
  dispatch(request);
  axios
    .post('/api/account/login', loginDetails)
    .then(res => {
      if (res.data.success) {
        const token = res.data.token;
        const profile = res.data._doc;
        /* Dispatch the response to redux */
        dispatch(receiveLogin(token));
        dispatch(receiveUserProfile(profile));
      } else {
        const error = res.data.message;
        dispatch(rejectLogin(error));
      }
    })
    .catch(err => {
      dispatch(rejectLogin(err));
    })
};