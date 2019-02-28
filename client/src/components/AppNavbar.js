import React, { Component } from 'react';
import {
  Container
} from 'reactstrap';
import logo from '../artifacts/smallbooks-logo-1.png'
import NavbarTab from './NavbarTab';
import { connect } from 'react-redux';
import { logout } from '../actions/registerActions';
import PropTypes from 'prop-types';

class AppNavbar extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  };

  render() {
    let navLinks = [
      {
        // Search by genre for stories or authors
        tabName:"Find Stories",
        isLogout: false,
        link:"/"
      },
      { 
        // View the stories you've added to your shelf
        tabName:"My Shelf",
        isLogout: false,
        link: "/authors"
      },
      { 
        // View your profile's author and its stories
        tabName:"My Stories",
        isLogout: false,
        link: "/myStories"
      },
      this.props.token === null ? {
        tabName: "Login / Signup",
        isLogout: false,
        link: "/login"
      } : {
        tabName: "Logout",
        isLogout: true,
        link: "/"
      }
    ];
    return (
      <div className="navbar">
        <Container>
          <div className="navbar-logo">
            <a href="/"><img src={logo} alt="Small Books Logo"/></a>
          </div>
          <ul className="navbar-tabs">
            {navLinks.map(navLink => {
              return <NavbarTab key={navLink.tabName} navbarLink={navLink} onClick={navLink.isLogout ? this.props.logout : () => {}}/>
            })}
          </ul>
        </Container>
      </div>  
    );
  };
};

const mapStateToProps = state => ({
  token: state.login.token
});

/* allows you to execute functions from the UI */
const mapDispatchToProps = dispatch => {
  return {
    logout: () => logout(dispatch)
  };
};

AppNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  token: PropTypes.string
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);
