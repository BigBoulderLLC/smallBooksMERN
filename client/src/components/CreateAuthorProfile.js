import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import { addAuthor } from '../actions/authorActions';

class CreateAuthorProfile extends Component {
  state = {
    isModalOpen: false,
    author: {
        id: null,
        authorName: "",
        authorBiography: "",
        authorImage: "",
        createdBy:"",
        updatedBy:""
      }
  }

  toggle = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  onChange = e => {
    e.preventDefault();
    let author = this.state.author;
    author[e.target.name] = e.target.value;
    this.setState({
      author: author
    });
  }

  onSubmit = e => {
    e.preventDefault();
    let author = this.state.author;
    author.createdBy = "Phatty J";
    author.updatedBy = "Phatty J";
    this.setState({
      author: author
    });
    const newAuthor = this.state.author;

    this.props.addAuthor(newAuthor);
    this.toggle();
  }

  render() {
    return(
      <div>
        <Button
          color="success"
          style={{marginBottom: '2rem'}}
          onClick={this.toggle}
        >
          Create Author
        </Button>

        <Modal
          isOpen={this.state.isModalOpen}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>
            Create Author
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="authorName">Author Name</Label>
                <Input type="text" name="authorName" id="author name" onChange={this.onChange}/>
              </FormGroup>
              <FormGroup>
                <Label for="authorBiography">Author Biography</Label>
                <Input type="textarea" name="authorBiography" id="author biography" onChange={this.onChange} />
              </FormGroup>
              <Button
                color="primary"
                className="pull-right"
                onClick={this.onSubmit}
                block
              >
                Save Author
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  addAuthor: state.author
});

export default connect(mapStateToProps, {addAuthor})(CreateAuthorProfile);
