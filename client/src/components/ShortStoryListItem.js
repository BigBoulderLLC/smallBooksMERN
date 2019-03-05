import React, { Component } from 'react';
import {
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
  Button
} from 'reactstrap';
import PropTypes from 'prop-types';

class ShortStoryListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return(
    	<Card body
      className={this.props.showReadStory && !this.props.showEditStory ? "m-3 shadowHover-2" : "m-3 shadow-2"}
      onClick={
        this.props.showReadStory && !this.props.showEditStory ?
        () => {
          window.location.href = "/story/" + this.props.shortStory._id
        } :
        null
      }
      >

    			<CardTitle tag="h3">
            {this.props.shortStory.name}
          </CardTitle>

          {
            this.props.hideAuthor ?

            null :
            
            <CardSubtitle className="ml-2">
              {"By: " + this.props.shortStory.author}
            </CardSubtitle>
          }

          <div className="mb-2"/>

	  			<CardText className="ml-2">
	  				{this.props.shortStory.description}
	  			</CardText>

          {
            this.props.showReadStory && this.props.showEditStory ?
            <Button outline
              color="dark"
              className="mx-5 mb-2"
              onClick={() => {
                window.location.href = "/story/" + this.props.shortStory._id;
              }}>
              Read Story
            </Button> :
            null
          }


          {
            this.props.showEditStory ?
            <Button outline
              color="primary"
              className="mx-5 mb-2"
              onClick={() => {
                window.location.href = "/story/" + this.props.shortStory._id;
              }}>
              Edit Story
            </Button> :
            null
          }

    	</Card>
    );
  }
}

ShortStoryListItem.propTypes = {
  shortStory: PropTypes.object.isRequired
}

export default ShortStoryListItem;
