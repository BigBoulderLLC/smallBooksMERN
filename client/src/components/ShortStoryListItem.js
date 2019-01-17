import React, { Component } from 'react';
import {
  CardHeader,
  Card,
  CardBody,
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
      className="mb-3"
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

          <CardSubtitle className="ml-2">
            {"By: " + this.props.shortStory.author}
          </CardSubtitle>

	  			<CardText className="ml-2">
	  				{this.props.shortStory.description}
	  			</CardText>

          {
            this.props.showEditStory ?
            <Button outline
              color="dark"
              className="mx-5"
              onClick={() => {
                window.location.href = "/story/" + this.props.shortStory._id;
              }}>
              Edit Story
            </Button> :
            null
          }

          {
            this.props.showReadStory && this.props.showEditStory ?
            <Button outline
              color="dark"
              className="mx-1"
              onClick={() => {
                window.location.href = "/story/" + this.props.shortStory._id;
              }}>
              Read Story
            </Button> :
            null
          }

          {
            this.props.showDeleteStory ?
            <Button outline
              color="danger"
              className="mx-5"
              style={{marginRight:"10px"}}
              onClick={this.onDeleteClick.bind(this, this.props.shortStory._id)}
            >
              Delete Story
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

const mapStateToProps = (state) => ({
  shortStory: state.shortStory
});

export default ShortStoryListItem;
