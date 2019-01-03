import React, { Component } from 'react';
import {
  CardHeader,
  Card,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';
import ShortStoryList from './ShortStoryList';
import PropTypes from 'prop-types';

class AuthorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return(
    	<Card>

  			<CardHeader tag="h3">
            {this.props.author.authorName}
        </CardHeader>

  			<CardBody>

  				<CardTitle>
  					Biography
  				</CardTitle>

	  			<CardText>
	  				{this.props.author.authorBiography}
	  			</CardText>

	  			<CardTitle>
	  				Stories by this Author
	  			</CardTitle>

	  			<ShortStoryList/>

  		  </CardBody>

    	</Card>
    );
  }
}

AuthorProfile.propTypes = {
  author: PropTypes.object.isRequired
}

export default AuthorProfile;
