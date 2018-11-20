import React, {Component} from 'react';
import { Container, TabContent, TabPane, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';

import Signup from './Signup';

class UserSiteAccess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.activeTab
    }
    this.toggle.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
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
              
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="signup">
            <Row>
              <Col sm="12">
                <Signup />  
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </Container>
    );
  }
}

export default UserSiteAccess;