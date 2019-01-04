import React, {Component} from 'react';
import { Container, TabContent, TabPane, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import { Redirect } from "react-router-dom";

import Signup from './Signup';
import Login from './Login';

class UserSiteAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.activeTab,
      isLoggedIn: false
    }
    this.toggle.bind(this);
    this.setLogin = this.setLogin.bind(this);
  }

  componentDidMount() {
    let username = sessionStorage.getItem("username");
    console.log(username);
    username === undefined || username === null ? 
      this.setState({isLoggedIn:false}) : 
      this.setState({isLoggedIn:true})
    console.log(`${this.state.isLoggedIn}`);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  setLogin(login) {
    this.setState({
      isLoggedIn: login
    }, function() {
      console.log(`New login val: ${this.state.isLoggedIn}, ${login}`);
    })
  }

  render() {
    if (this.state.isLoggedIn) {
      return( <Redirect to="/profile"/>)
    } else {
      return(
        <Container className="login-container">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className= {classnames({active:this.state.activeTab === "login"})}
                  onClick={() => {this.toggle("login")}}
                >
                  Log In
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className= {classnames({active:this.state.activeTab === "signup"})}
                  onClick={() => {this.toggle("signup")}}
                >
                  Sign Up
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="login">
                <Row>
                  <Col sm="12">
                    <Login setLogin={this.setLogin}/>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="signup">
                <Row>
                  <Col sm="12">
                    <Signup setLogin={this.setLogin}/>  
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </Container>
      )
    }
  }
}

export default UserSiteAccess;