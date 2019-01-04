import React, {Component} from 'react'
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../actions/registerActions';

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userUsername:"",
      userPassword:""
    }
    this.loginAction = this.loginAction.bind(this)
    this.submit = this.submit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  loginAction(e) {
    e.preventDefault()
    this.props.login({username:this.state.userUsername, password:this.state.userPassword})
    this.props.setLogin(true)
  }

  submit(e) {
    this.loginAction(e)
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return(
      <Form onSubmit={this.submit}>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="username" name="userUsername" id="userUsername" placeholder="Enter a valid email address" onChange={this.onChange} />
        </FormGroup>
        <FormGroup>
          <Label for="userPassword">Password</Label>
          <Input
            type="password"
            name="userPassword"
            id="userPassword"
            placeholder="********"
            onChange={this.onChange}
          />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
    )
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  login: {
    username:state.userUsername,
    password:state.userPassword
  }
})

export default connect(mapStateToProps, { login })(Login)