import React, { Component } from 'react';
import ShortStoryList from './ShortStoryList';
import {
	Container,
	Card,
	CardHeader,
	CardBody,
	CardTitle
} from 'reactstrap';

class BrowseShortStories extends Component {
  render() {
    return (
      <Container style={{height: '100%'}}>
      		<Card  className="m-3 shadow-2">
      			<CardHeader tag="h1">
      				Find Stories
      			</CardHeader>
      		</Card>
	        <ShortStoryList user={null} readOnly={true} />
	  </Container> 
    );
  }
}


export default BrowseShortStories;
