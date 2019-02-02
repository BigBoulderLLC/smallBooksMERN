import React, { Component } from 'react';
import {
  Container
} from 'reactstrap';

import logo from '../artifacts/smallbooks-logo-1.png'
import NavbarTab from './NavbarTab';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { login, logout } from '../actions/registerActions';
import {withRouter} from 'react-router-dom';

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state= {
      isOpen:false
    }
    this.toggle = this.toggle.bind(this);
    this.logoutOfApp = this.logoutOfApp.bind(this);
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logoutOfApp = withRouter((next) => {
    console.log("Trying to log out...");
    logout();
    next();
  })

  redirectToStories = () => {
    this.history.pushState(null, "/");
  }

  redirectToAuthors = () => {
    this.history.pushState(null, "/authors");
  }

  redirectToLogin = withRouter(() => {
    this.history.pushState(null, "/login");
  })

  render() {
    let navLinks = [
      {
        tabName:"Browse Stories",
        link: "/",
        clickAction: null
      },
      { 
        tabName:"Browse Authors",
        link: "/authors",
        clickAction: null
      }
    ]
    if (!this.props.isAuthenticated) {
      navLinks.push({
        tabName: "Login / Signup",
        link: "login",
        clickAction: null
      });
    } else {
      navLinks.push({
        tabName: "Logout",
        link:"/",
        clickAction: this.logoutOfApp
      });
    }
    return (

      <div className="navbar">
        <Container>
          <div className="navbar-logo">
            <a href="/"><img src={logo} alt="Small Books Logo"/></a>
          </div>
          <ul className="navbar-tabs">
            {navLinks.map(navLink => {
              return <NavbarTab key={navLink.tabName} navLink={navLink} />
            })}
          </ul>
        </Container>
      </div>
    );
  }
}

AppNavbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.login.isAuthenticated
});

export default connect(mapStateToProps, { login })(AppNavbar);
