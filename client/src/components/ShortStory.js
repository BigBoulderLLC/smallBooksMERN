import React, { Component } from 'react';
import StoryReader from './StoryReader';
import {
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import {getAuthorById} from '../actions/authorActions';
import {getStorySectionsByStoryId} from '../actions/storySectionActions';
import PropTypes from 'prop-types';

class ShortStory extends Component {

  state = {
    story: this.props.story,
    storySectionId: 0
  }

  componentDidMount() {
    this.props.getAuthorById(this.props.story.authorId);
    this.props.getStorySectionsByStoryId(this.props.story._id);
  }

  render() {
    let author = this.props.authors.authors;
    let storySections = this.props.storySections.storySections;
    let storySectionsLoading = this.props.storySections.storySectionsLoading;
    if (!storySectionsLoading && storySections.length > 0) {
      return(
        <StoryReader storySection={storySections[0]} author={author}/>
      );
    }
    return(
      <Container></Container>
    );
  }
}

ShortStory.propTypes = {
  getAuthorById: PropTypes.func.isRequired,
  authors: PropTypes.object.isRequired,
  getStorySectionsByStoryId: PropTypes.func.isRequired,
  storySections: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    authors: state.author,
    storySections: state.storySection,
  }
};

export default connect(mapStateToProps, { getAuthorById, getStorySectionsByStoryId })(ShortStory);
