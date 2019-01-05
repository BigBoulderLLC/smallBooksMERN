import React, { Component } from 'react';
import {
  Container
} from 'reactstrap';

import logo from '../artifacts/smallbooks-logo-1.png'
import NavbarTab from './NavbarTab';

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state= {
      isOpen:false,
      isLoggedIn:false
    }
    this.toggle = this.toggle.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    let token = localStorage.getItem('token')
    console.log(localStorage)
    if (token === null) {
      this.setState({
        isLoggedIn:false
      })
    } else {
      this.setState({
        isLoggedIn: true
      })
    }
    console.log("My Token from AppNavBar: " + token);
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout = () => {
    localStorage.removeItem('token');
  }

  render() {
    let navLinks = [
      {
        tabName:"Browse Stories",
        link:"/"
      },
      { 
        tabName:"Browse Authors",
        link: "/authors"
      }
    ]
    if (!this.state.isLoggedIn) {
      navLinks.push({
        tabName: "Login / Signup",
        link: "/login"
      })
    } else {
      navLinks.push({
        tabName: "Logout",
        link: "/"
      })
    }
    return (

      <div className="navbar">
        <Container>
          <div className="navbar-logo">
            <a href="/"><img src={logo} alt="Small Books Logo"/></a>
          </div>
          <ul className="navbar-tabs">
            {navLinks.map(navLink => {
              return <NavbarTab key={navLink.link} navbarLink={navLink} onClick={this.logout}/>
            })}
          </ul>
        </Container>
      </div>
    );
  }
}



export default AppNavbar;
