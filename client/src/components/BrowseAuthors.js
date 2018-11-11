import React, { Component } from 'react';
import CreateAuthorProfile from './CreateAuthorProfile';
import AuthorProfileList from './AuthorProfileList';
import {Container} from 'reactstrap';

class BrowseAuthors extends Component {
  render() {
    return (
      <Container>
        <CreateAuthorProfile />
        <AuthorProfileList />
      </Container>
    );
  }
}


export default BrowseAuthors;
