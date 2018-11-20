import axios from 'axios';
import { GET_STORIES, ADD_STORY, STORIES_LOADING, DELETE_STORY } from '../actions/types';

export const getStories = () => dispatch => {
  dispatch(setStoriesLoading());
  axios
    .get('/api/short-stories')
    .then(res => dispatch({
      type:GET_STORIES,
      payload: res.data
    }))
}

export const getStoryById = id => dispatch => {
  dispatch(setStoriesLoading());
  axios
    .get(`/api/short-stories/${id}`)
    .then(res => dispatch({
      type:GET_STORIES,
      payload: res.data
    }))
}

export const addStory = story => dispatch => {
  axios
    .post('/api/short-stories', story)
    .then(res => dispatch({
      type: ADD_STORY,
      payload:res.data
    }))
}

export const deleteStory = id => dispatch => {
  axios
    .delete(`/api/short-stories/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_STORY,
        payload: id
      })
    )
}

export const setStoriesLoading = () => {
  return {
    type: STORIES_LOADING
  }
}
