import React, { Component } from 'react';
import ShortStoryList from './ShortStoryList';
import {
	Button,
	Container,
	Input,
	InputGroup,
	InputGroupButtonDropdown,
	InputGroupAddon,
	DropdownMenu,
	DropdownToggle,
	DropdownItem
} from 'reactstrap';

class BrowseShortStories extends Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.state = {
      dropdownOpen: false,
      splitButtonOpen: false
    };
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }

  render() {
    return (
      <Container style={{height: '100%'}}>

        <InputGroup size="lg">
          <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
            <DropdownToggle caret>
              Genre
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Horror</DropdownItem>
              <DropdownItem>Romance</DropdownItem>
            </DropdownMenu>
          </InputGroupButtonDropdown>
          <Input />
           <InputGroupAddon addonType="append"><Button color="primary">{"  Search   "}</Button></InputGroupAddon>
        </InputGroup>

        <ShortStoryList user={null} readOnly={true} />

	  </Container> 
    );
  }
}


export default BrowseShortStories;
