import axios from 'axios';
import { GET_AUTHORS, ADD_AUTHOR, AUTHORS_LOADING, DELETE_AUTHOR } from '../actions/types';

export const getAuthors = () => dispatch => {
  dispatch(setAuthorsLoading());
  axios
    .get('/api/authors')
    .then(res => dispatch({
      type:GET_AUTHORS,
      payload: res.data
    }))
}

export const addAuthor = author => dispatch => {
  axios
    .post('/api/authors', author)
    .then(res => dispatch({
      type: ADD_AUTHOR,
      payload:res.data
    }))
}

export const deleteAuthor = id => dispatch => {
  axios
    .delete(`/api/authors/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_AUTHOR,
        payload: id
      })
    )
}

export const setAuthorsLoading = () => {
  return {
    type: AUTHORS_LOADING
  }
}
