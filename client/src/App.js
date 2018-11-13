import React, { Component } from 'react';
import AppNavBar from './components/AppNavbar';
import BrowseAuthors from './components/BrowseAuthors';
import StoryReader from './components/StoryReader';
import BrowseShortStories from './components/BrowseShortStories';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
  Container
 } from 'reactstrap';

/* Import for our store and redux */
import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import {
  faCoffee,
  faCog,
  faSpinner,
  faQuoteLeft,
  faSquare,
  faCheckSquare
} from '@fortawesome/free-solid-svg-icons';

library.add(
  fab,
  faCoffee,
  faCog,
  faSpinner,
  faQuoteLeft,
  faSquare,
  faCheckSquare
)

class App extends Component {

  render() {
    let browseShortStories = () => {
      return(
        <StoryReader/>
        //<BrowseShortStories/>
      );
    }

    let browseAuthors = () => {
      return(
        <BrowseAuthors/>
      );
    }

    return (
      <Provider store={store}>
        <div className="App" style={{height: '100%'}}>

          <header className="App-header">
            <AppNavBar />
          </header>

          <Router>
            <div style={{height: '88%'}}>
              <Route exact path="/" component={browseShortStories} />
              <Route path="/authors" component={browseAuthors} />
            </div>
          </Router>

        </div>
      </Provider>
    );
  }
}

export default App;
