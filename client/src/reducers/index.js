import { combineReducers } from 'redux';
import shortStoryReducer from './shortStoryReducer';
import authorProfileReducer from './authorProfileReducer';


export default combineReducers({
  shortStory: shortStoryReducer,
  author: authorProfileReducer
});