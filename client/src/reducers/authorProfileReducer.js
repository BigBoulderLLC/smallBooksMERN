// import uuid from 'uuid';
import { GET_AUTHORS, ADD_AUTHOR, DELETE_AUTHOR, AUTHORS_LOADING } from '../actions/types';

const initialState = {
  authors: [],
  loading: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case GET_AUTHORS:
      return {
        ...state,
        authors: action.payload,
        loading: false
      };
    case ADD_AUTHOR: 
      return {
        ...state,
        authors: [action.payload, ...state.authors]
      };
    case DELETE_AUTHOR:
      return {
        ...state,
        authors: state.authors.filter(author => author._id !== action.payload)
      };
    case AUTHORS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}