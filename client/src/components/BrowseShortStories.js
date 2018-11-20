import React, { Component } from 'react';
import ShortStoryModal from './shortStoryModal';
import ShortStoryList from './ShortStoryList';
import {Container} from 'reactstrap';

class BrowseShortStories extends Component {
  render() {
    return (
      <Container style={{height: '100%'}}>
        <ShortStoryModal />
        <ShortStoryList />
      </Container>
    );
  }
}


export default BrowseShortStories;
