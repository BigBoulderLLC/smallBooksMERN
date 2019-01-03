import React, { Component } from 'react';
import AppNavBar from './components/AppNavbar';
import UserSiteAccess from './components/UserSiteAccess';
import BrowseAuthors from './components/BrowseAuthors';
import ViewShortStory from './components/ViewShortStory';
import BrowseShortStories from './components/BrowseShortStories';
import UserProfile from './components/UserProfile';
import { BrowserRouter as Router, Route} from "react-router-dom";
import {
  Button
} from 'reactstrap';
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
  constructor(props) {
    super(props);
    this.state = {
      showLoginModal:false
    }
    this.toggleLoginModal = this.toggleLoginModal.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  toggleLoginModal = () => {
    this.setState({
      showLoginModal: !this.state.showLoginModal
    })
    console.log(`Login Model? : ${this.state.showLoginModal}`);
  }

  logOut = () => {
    sessionStorage.clear()
  }

  render() {
    const browseShortStories = () => {
      return(
        <BrowseShortStories/>
      );
    }

    const browseAuthors = () => {
      return(
        <BrowseAuthors/>
      );
    }

    let viewShortStory = ({match}) => {
      const storyId = match.params.storyId;
      return (
        <ViewShortStory storyId={storyId}/>
      );
    }
      
    const signup = () => {
      return(
        <UserSiteAccess activeTab="signup"/>
      )
    }

    const login = () => {
      return(
        <UserSiteAccess activeTab="login"/>
      )
    }

    const userProfile = () => {
      return(
        <UserProfile />
      )
    }

    return (
      <Provider store={store}>
        <div className="App" style={{height: '100%'}}>

          <header className="App-header">
            <AppNavBar />
          </header>
          <div>
            <Button onClick={this.logOut}>Log Out</Button>
          </div>
          {/* <UserSiteAccess /> */}
          {/* <LoginModal showModal={this.state.showLoginModal} toggle={this.toggleLoginModal.bind(this)}/>
          <Container>
            <Button
              onClick = {this.toggleLoginModal}
              className="pull-right"
            >
              Log In
            </Button>
          </Container> */}
          <Router>
            <div style={{height: '88%'}}>
              <Route exact path="/" component={browseShortStories} />
              <Route path="/authors" component={browseAuthors} />
              <Route path="/story/:storyId" component={viewShortStory} />
              <Route path="/signup" component={signup} />
              <Route path="/login" component={login} />
              <Route path="/profile" component={userProfile} />
            </div>
          </Router>

        </div>
    );
  }
}

/* Will inject the cookies object as a prop into App. 
We can then access this.props.cookies within App. */
export default withCookies(App);
