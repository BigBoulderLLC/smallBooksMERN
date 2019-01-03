import React, { Component } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
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

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // showModal: this.props.showModal,
      email:this.props.email,
      username:this.props.username,
      password:this.props.password
    }
    // this.toggle = this.toggle.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    console.log(`Login Modal Component: showModal = ${this.state.showModal}`);
  }

  // toggle = () => {
  //   this.setState({
  //     showModal: !this.state.showModal
  //   })
  // }

  onChange = e => {
    // let shortStory = this.state.shortStory;
    // shortStory[e.target.name] = e.target.value;
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  
  onSubmit = e => {
    e.preventDefault();
    this.props.register({
      email:this.state.email,
      username:this.state.username,
      password:this.state.password,
      passwordConf:"IDK what this is"
    });
    

    // this.setState({
    //   password: null
    // });
  }

  render() {
    return(
      <Modal isOpen={this.props.showModal} toggle={this.props.toggle}>
        <ModalHeader toggle={this.props.toggle}>
          Login
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" placeholder="Enter a valid email address" onChange={this.onChange} />
            </FormGroup>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input type="username" name="username" id="username" placeholder="Enter a valid email address" onChange={this.onChange} />
            </FormGroup>
            <FormText>Your username can't be changed, so choose wisely.</FormText>
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
        </ModalBody>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  register: state.shortStory
});

export default connect(mapStateToProps, { register, login })(LoginModal);