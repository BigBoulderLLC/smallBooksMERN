import React, { Component } from 'react';
import AppNavBar from './components/AppNavbar';
import ShortStoryList from './components/ShortStoryList';
import ShortStoryModal from './components/shortStoryModal';
import LoginModal from './components/LoginModal';
import { Container, Button } from 'reactstrap';

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
    return (
      <div className="App">
        <header className="App-header">
          <AppNavBar toggleLoginModal={this.toggleLoginModal.bind} />
        </header>
        <LoginModal showModal={this.state.showLoginModal} toggle={this.toggleLoginModal.bind(this)}/>
        <Container>
          <Button
            onClick = {this.toggleLoginModal}
            className="pull-right"
          >
            Log In
          </Button>
          <ShortStoryModal />
          <ShortStoryList />
        </Container>
      </div>
    );
  }
}

/* Will inject the cookies object as a prop into App. 
We can then access this.props.cookies within App. */
export default withCookies(App);
