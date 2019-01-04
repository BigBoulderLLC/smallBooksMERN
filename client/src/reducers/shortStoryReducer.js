// import uuid from 'uuid';
import { GET_STORIES, ADD_STORY, DELETE_STORY, STORIES_LOADING } from '../actions/types';

const initialState = {
  shortStories: [],
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_STORIES:
      return {
        ...state,
        shortStories: action.payload,
        loading:false
      };
    case ADD_STORY:
      return {
        ...state,
        shortStories: [action.payload, ...state.shortStories]
      };
    case DELETE_STORY:
      return {
        ...state,
        shortStories: state.shortStories.filter(shortStory => shortStory._id !== action.payload)
      };
    case STORIES_LOADING:
      return {
        ...state,
        loading:true
      };
    default:
      return state;
  }
}
