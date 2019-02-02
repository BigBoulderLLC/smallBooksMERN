import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {loadState, saveState} from './localStorage';


const configureStore = () => {
  const persistedState = loadState()
  const middleware = [thunk]
  const store = createStore(
    rootReducer, 
    persistedState, 
    // initialState,
    compose(
      applyMiddleware(...middleware),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
  )

  /* saves the state to local storage any time the state changes */
  /* TO DO: Add throttle from LoDash to prevent this running more than once per second */
  store.subscribe(() => {
    saveState(store.getState()); 
    // console.log(localStorage)
  })

  return store
}

export default configureStore