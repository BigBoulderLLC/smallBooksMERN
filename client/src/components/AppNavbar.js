import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container
} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class AppNavbar extends Component {
  state = {
    isOpen: false
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (

      <div>

        <Navbar color="dark" dark expand="sm" className="mb-5">
          <Container>
            <NavbarBrand href="/">SmallBooks</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/">
                     Browse Stories
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/authors">
                     Browse Authors
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://help.github.com/articles/basic-writing-and-formatting-syntax/">
                  <FontAwesomeIcon icon="cog" /> Account Settings
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://help.github.com/articles/basic-writing-and-formatting-syntax/">
                  <FontAwesomeIcon icon="cog" /> Account Settings
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}



export default AppNavbar;
