import { combineReducers } from 'redux';
import shortStoryReducer from './shortStoryReducer';
import authorProfileReducer from './authorProfileReducer';
import loginReducer from './loginReducer';


export default combineReducers({
  shortStory: shortStoryReducer,
  author: authorProfileReducer,
  login: loginReducer
});