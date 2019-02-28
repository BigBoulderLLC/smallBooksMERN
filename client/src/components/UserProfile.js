import React, { Component } from 'react';
import { Container, Button } from 'reactstrap';
import TextFieldReadOnly from './TextFieldReadOnly';
import { connect } from 'react-redux';
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
    return(
      <Container>
        <div className="user-profile-header">
          <h1>Hello <em>{this.props.user.username}</em></h1>
          <Button
            onClick={this.toggleEditMode}
          >Edit Profile</Button>
        
        </div>
        <TextFieldReadOnly fieldLabel="Primary Email" fieldValue={this.props.user.email}/>
        <TextFieldReadOnly fieldLabel="Full Name" fieldValue={"yo"}/>
      </Container>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.userProfile
  }
}

export default connect(mapStateToProps)(UserProfile);