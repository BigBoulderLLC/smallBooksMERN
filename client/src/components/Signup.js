import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText,
  FormFeedback
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../actions/registerActions'; 

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:this.props.email,
      username:this.props.username,
      password:this.props.password,
      registrationResult:{},
      usernameError:false,
      emailError:false,
      generalError:false,
      usernameErrorMessage:"",
      emailErrorMessage:"",
      generalErrorMessage:""
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  onSubmit = e => {
    e.preventDefault();
    this.props.register({
      email:this.state.email,
      username:this.state.username,
      password:this.state.password
    })
    this.props.setLogin(true)

    /* TO DO -- Set error messages on form when mongoose returns an error */
    // if (response.success) {
    //   console.log("No Error occurred")
    //   this.props.setLogin(true);
    // } else {
    //   console.log("Error occurred")
    //   console.log(response)
    //   if (response.includes("Username")) {
    //     this.setState({
    //       usernameError:true,
    //       usernameErrorMessage:response
    //     })
    //   } else if (response.includes("Email")) {
    //     this.setState({
    //       emailError:true,
    //       emailErrorMessage: response
    //     })
    //   } else {
    //     this.setState({
    //       generalError:true,
    //       generalErrorMessage: "Unknown error occurred."
    //     })
    //   }
    // }
  }

  render() {
    return(
      <div className="tab-container">
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Enter a valid email address" 
              onChange={this.onChange}
              invalid={this.state.emailError}
            />
            <FormFeedback invalid>
              {this.state.emailErrorMessage}
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input 
              type="username" 
              name="username" 
              id="username" 
              placeholder="Enter a valid email address" 
              onChange={this.onChange} 
              invalid={ this.state.usernameError }
            />
            <FormFeedback invalid>
              {this.state.usernameErrorMessage}
            </FormFeedback>
            <FormText>Your username can't be changed, so choose wisely.</FormText>
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="********"
              onChange={this.onChange}
            />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}

Signup.propTypes = {
  register: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  register: state.registrationResult
})

export default connect(mapStateToProps, { register })(Signup)