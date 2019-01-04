// import uuid from 'uuid';
import { GET_STORY_SECTIONS, ADD_STORY_SECTION, DELETE_STORY_SECTION, STORY_SECTIONS_LOADING } from '../actions/types';

const initialState = {
  storySections: [],
  storySectionsLoading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_STORY_SECTIONS:
      return {
        ...state,
        storySections: action.payload,
        storySectionsLoading:false
      };
    case ADD_STORY_SECTION:
      return {
        ...state,
        storySections: [action.payload, ...state.storySections]
      };
    case DELETE_STORY_SECTION:
      return {
        ...state,
        storySections: state.storySections.filter(storySection => storySection._id !== action.payload)
      };
    case STORY_SECTIONS_LOADING:
      return {
        ...state,
        storySectionsLoading:true
      };
    default:
      return state;
  }
}
