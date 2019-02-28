import { GET_USER_PROFILE, USER_PROFILE_SUCCESS, USER_PROFILE_FAILURE } from '../actions/types';

const initialState = {
  userProfileLoading: false,
  userProfile: {},
  error: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfileLoading: true,
        userProfile: {},
        error: null
      };
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfileLoading: false,
        userProfile: action.payload.profile
      };
    case USER_PROFILE_FAILURE:
      return {
        userProfileLoading: false,
        userProfile: {},
        error: action.payload.error
      };
    default:
      return state;
  }
};