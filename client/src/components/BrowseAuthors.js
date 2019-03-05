import React, { Component } from 'react';
import AuthorProfileList from './AuthorProfileList';
import {Container} from 'reactstrap';

class BrowseAuthors extends Component {
  render() {
    return (
      <Container>
        <AuthorProfileList readOnly={true}/>
      </Container>
    );
  }
}


export default BrowseAuthors;
