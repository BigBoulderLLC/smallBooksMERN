import React, { Component } from 'react';
import AuthorProfile from './AuthorProfile';
import {
  Container,
  Button,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';
import { connect } from 'react-redux';
import { getAuthors, deleteAuthor } from '../actions/authorActions';
import PropTypes from 'prop-types';

class AuthorProfileList extends Component {
  state = {
    authorId: 0
  }

  componentDidMount() {
    this.props.getAuthors();
  }

  onDeleteClick = (id) => {
    this.props.deleteAuthor(id);
  }

  render() {
    const { authors }  = this.props.authors;
    const authorId = this.state.authorId;
    return(
      authors.map((author) => (
        <AuthorProfile author={author}/>
      ))
    )
  }
}

AuthorProfileList.propTypes = {
  getAuthors: PropTypes.func.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
  authors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  authors: state.author
});

export default connect(mapStateToProps, { getAuthors, deleteAuthor })(AuthorProfileList);
