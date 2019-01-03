import React, { Component } from 'react';
import {Container, Button} from 'reactstrap';
import TextFieldReadOnly from './TextFieldReadOnly';
// import {
//   Form,
//   FormGroup,
//   Label,
//   Input,
//   Button,
//   FormText
// } from 'reactstrap';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      fullName: "Harry Osborne"
    }
    this.toggleEditMode = this.toggleEditMode.bind(this)
  }

  toggleEditMode() {
    this.setState({
      isEditMode: !this.state.isEditMode
    }, function() {
      console.log(`Edit Mode: ${this.state.isEditMode}`)
    })
  }

  render() {
    let username = sessionStorage.getItem("username");
    let email = sessionStorage.getItem("email");
    return(
      <Container>
        <div className="user-profile-header">
          <h1>Hello <em>{username}</em></h1>
          <Button
            onClick={this.toggleEditMode}
          >Edit Profile</Button>
        
        </div>
        <TextFieldReadOnly fieldLabel="Primary Email" fieldValue={email}/>
        <TextFieldReadOnly fieldLabel="Full Name" fieldValue={this.state.fullName}/>
      </Container>
    )
  }
}

export default UserProfile;