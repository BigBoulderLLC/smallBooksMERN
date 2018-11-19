import axios from 'axios';
import { GET_STORY_SECTIONS, ADD_STORY_SECTION, DELETE_STORY_SECTION, STORY_SECTIONS_LOADING } from '../actions/types';

export const getStorySections = () => dispatch => {
  dispatch(setStorySectionsLoading());
  axios
    .get('/api/story-sections')
    .then(res => dispatch({
      type:GET_STORY_SECTIONS,
      payload: res.data
    }))
}

export const addStorySection = story => dispatch => {
  axios
    .post('/api/story-sections', story)
    .then(res => dispatch({
      type: ADD_STORY_SECTION,
      payload:res.data
    }))
}

export const deleteStorySection = id => dispatch => {
  axios
    .delete(`/api/story-sections/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_STORY_SECTION,
        payload: id
      })
    )
}

export const setStorySectionsLoading = () => {
  return {
    type: STORY_SECTIONS_LOADING
  }
}
