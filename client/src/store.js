import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

const middleware = [thunk];

const saveState = (state) => {
  try {
    let serializedState = JSON.stringify(state);
    localStorage.setItem("smallBooksState", serializedState);
  }
  catch (err) {
    console.log(err);
  }
}

const loadState = () => {
  try {
    let serializedState = localStorage.getItem("smallBooksState");
    if (serializedState === null) {
      return initialState;
    }
    return JSON.parse(serializedState);
  }
  catch (err) {
    console.log(err);
    return initialState;
  }
}

const store = createStore(
  rootReducer, 
  loadState(), 
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(() => {
  saveState(store.getState());
});

export default store;