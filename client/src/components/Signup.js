import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register, login } from '../actions/registerActions'; 

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email:this.props.email,
      username:this.props.username,
      password:this.props.password
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    console.log(`Login Modal Component: showModal = ${this.state.showModal}`)
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
      password:this.state.password,
      passwordConf:"IDK what this is"
    })
    sessionStorage.setItem("username", this.state.username)
    this.props.setLogin(true);
  }

  render() {
    return(
      <div className="tab-container">
        <Form onSubmit={this.onSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Enter a valid email address" onChange={this.onChange} />
          </FormGroup>
          <FormGroup>
            <Label for="username">Username</Label>
            <Input type="username" name="username" id="username" placeholder="Enter a valid email address" onChange={this.onChange} />
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
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  register: state.shortStory
})

export default connect(mapStateToProps, { register, login })(Signup)