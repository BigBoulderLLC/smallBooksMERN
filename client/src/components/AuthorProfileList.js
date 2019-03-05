import React, { Component } from 'react';
import AuthorProfile from './AuthorProfile';
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
    return(
      Array.isArray(authors) ?
      authors.map((author) => (
        <AuthorProfile author={author} readOnly={this.props.readOnly} />
      )) :
      <AuthorProfile author={authors} readOnly={this.props.readOnly} />
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
