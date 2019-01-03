import React, {Component} from 'react'
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormText
} from 'reactstrap';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username:"",
      password:""
    }
    this.login = this.login.bind(this)
    this.submit = this.submit.bind(this)
    this.onChange = this.onChange.bind(this)
  }

  login(e) {
    e.preventDefault()

    Auth.login(this.state.username, this.state.password)
      .catch(function(err) {
        console.log("Error Logggin In", err)
      })
  }

  submit(e) {
    this.login(e)
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
          <Input type="username" name="username" id="username" placeholder="Enter a valid email address" onChange={this.onChange} />
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
    )
  }
}

export default Login