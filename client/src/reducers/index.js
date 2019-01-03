import { combineReducers } from 'redux';
import shortStoryReducer from './shortStoryReducer';
import storySectionReducer from './storySectionReducer';
import authorProfileReducer from './authorProfileReducer';


export default combineReducers({
  shortStory: shortStoryReducer,
  storySection: storySectionReducer,
  author: authorProfileReducer
});