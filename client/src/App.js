import React, { Component } from 'react';
import AppNavBar from './components/AppNavbar';
import LoginModal from './components/LoginModal';
import { Container, Button } from 'reactstrap';
import BrowseAuthors from './components/BrowseAuthors';
import ViewShortStory from './components/ViewShortStory';
import BrowseShortStories from './components/BrowseShortStories';
import { BrowserRouter as Router, Route } from "react-router-dom";

/* Import for our store and redux */

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

import { withCookies } from 'react-cookie';

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
  state = {
    showLoginModal:false
  }

  toggleLoginModal = () => {
    this.setState({
      showLoginModal: !this.state.showLoginModal
    })
    console.log(`Login Model? : ${this.state.showLoginModal}`);
  }

  render() {
    let browseShortStories = () => {
      return(
        <BrowseShortStories/>
      );
    }

    let browseAuthors = () => {
      return(
        <BrowseAuthors/>
      );
    }

    let viewShortStory = ({match}) => {
      const storyId = match.params.storyId;
      return (
        <ViewShortStory storyId={storyId}/>
      )
    }

    return (
      <Provider store={store}>
        <div className="App" style={{height: '100%'}}>

          <header className="App-header">
            <AppNavBar />
          </header>
          <LoginModal showModal={this.state.showLoginModal} toggle={this.toggleLoginModal.bind(this)}/>
          <Container>
            <Button
              onClick = {this.toggleLoginModal}
              className="pull-right"
            >
              Log In
            </Button>
          </Container>
          <Router>
            <div style={{height: '88%'}}>
              <Route exact path="/" component={browseShortStories} />
              <Route path="/authors" component={browseAuthors} />
              <Route path="/story/:storyId" component={viewShortStory} />
            </div>
          </Router>

        </div>
    );
  }
}

/* Will inject the cookies object as a prop into App. 
We can then access this.props.cookies within App. */
export default withCookies(App);
