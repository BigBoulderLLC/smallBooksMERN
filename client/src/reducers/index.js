import { combineReducers } from 'redux';
import shortStoryReducer from './shortStoryReducer';
import storySectionReducer from './storySectionReducer';
import authorProfileReducer from './authorProfileReducer';
import loginReducer from './loginReducer';


export default combineReducers({
  shortStory: shortStoryReducer,
  storySection: storySectionReducer,
  author: authorProfileReducer
  login: loginReducer
});