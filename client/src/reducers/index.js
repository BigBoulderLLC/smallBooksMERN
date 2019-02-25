import { combineReducers } from 'redux';
import shortStoryReducer from './shortStoryReducer';
import storySectionReducer from './storySectionReducer';
import authorProfileReducer from './authorProfileReducer';
import loginReducer from './loginReducer';
import userProfileReducer from './userProfileReducer';
import { LOGOUT } from '../actions/types';

const appReducer = combineReducers({
  shortStory: shortStoryReducer,
  storySection: storySectionReducer,
  author: authorProfileReducer,
  login: loginReducer,
  user: userProfileReducer
});

const rootReducer = ( state, action ) => {
  if ( action.type === LOGOUT ) {
    state = undefined;
  }
      
  return appReducer(state, action)
}

export default rootReducer;