import React, { Component } from 'react';
import {Container, Button} from 'reactstrap';
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
      isEditMode: false
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
    const username = sessionStorage.getItem("username");
    return(
      <Container>
        <div>
          <h1>Hello <em>{username}</em></h1>
          <Button
            onClick={this.toggleEditMode}
          >Edit Profile</Button>
        
        </div>
      </Container>
    )
  }
}

export default UserProfile;