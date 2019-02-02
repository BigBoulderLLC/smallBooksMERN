import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardHeader,
  CardBody
} from 'reactstrap';
import { connect } from 'react-redux';
import { addStory } from '../actions/storyActions';
import PropTypes from 'prop-types';

class CreateShortStory extends Component {
  state = {
    shortStory: {
      id: null,
      name: "",
      description: "",
      authorId: null,
      author: "",
      isPublic:false,
      createdBy:"",
      updatedBy:""
    },
    storySection: {
      id: null,
      //we will need to write the story to get the auto generated id, then write the section
      storyId: null,
      title: "Test",
      text: "Test",
      createdDate: "",
      updatedDate: "",
      createdBy: "Jake Default",
      updatedBy: "Jake Default"
    }
  }

  onChange = e => {
    let shortStory = this.state.shortStory;
    shortStory[e.target.name] = e.target.value;
    this.setState({
      shortStory: shortStory
    });
  }

  onChangeStorySection = e => {
    let storySection = this.state.storySection;
    storySection[e.target.name] = e.target.value;
    this.setState({
      storySection: storySection
    });
  }

  onSubmit = e => {
    e.preventDefault();
    let shortStory = this.state.shortStory;

    //createdBy = this.props.user
    shortStory.createdBy = this.props.author.authorName;
    shortStory.updatedBy = this.props.author.authorName;
    shortStory.authorId = this.props.author._id;
    shortStory.author = this.props.author.authorName;

    let storySection = this.state.storySection;

    this.props.addStory({shortStory, storySection});

    this.state.shortStory = shortStory;

    this.props.toggleCreatingStory();
  }

  cancel = e => {
    e.preventDefault();
    this.props.toggleCreatingStory();
  }

  render() {
    console.log(this.props);

    return(
      <div>

        <Card>

          <CardHeader tag="h3">
            Create Short Story
          </CardHeader>

          <CardBody>

            <Form onSubmit={this.onSubmit}>

              <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" name="name" id="title" onChange={this.onChange}/>
              </FormGroup>

              <FormGroup>
                <Label for="summary">Summary</Label>
                <Input type="textarea" name="description" id="summary" onChange={this.onChange} />
              </FormGroup>

              <FormGroup>
                <Label for="storyText">Story</Label>
                <Input type="textarea" name="text" id="storyText" onChange={this.onChangeStorySection} />
              </FormGroup>

              <FormGroup tag="fieldset">

                <legend>Privacy</legend>

                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="isPublic" onChange={this.onChange}/>{' '}
                    Make Story Private
                  </Label>
                </FormGroup>

                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="isPublic" onChange={this.onChange}/>{' '}
                    Make Story Public
                  </Label>
                </FormGroup>

              </FormGroup>

              <Button block outline
                color="dark"
                className=" mb-2"
                onClick={this.cancel}>
                Cancel
              </Button>

              <Button block
                color="primary"
                className=" mb-2"
                onClick={this.onSubmit}>
                Save Story
              </Button>

            </Form>

          </CardBody>

        </Card>

      </div>
    );
  }
}

CreateShortStory.propTypes = {
  toggleCreatingStory: PropTypes.func.isRequired,
  author: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  shortStories: state.shortStory,
  storySection: state.storySection
});

export default connect(mapStateToProps, {addStory})(CreateShortStory);