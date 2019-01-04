import React, { Component } from 'react';
import StoryReader from './StoryReader';
import {
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import {getStorySectionsByStoryId} from '../actions/storySectionActions';
import PropTypes from 'prop-types';

class ShortStory extends Component {

  state = {
    story: this.props.story,
    storySectionId: 0
  }

  componentDidMount() {
    this.props.getStorySectionsByStoryId(this.props.story._id);
  }

  render() {
    const storySections = this.props.storySections.storySections;
    const storySectionsLoading = this.props.storySections.storySectionsLoading;
    if (!storySectionsLoading && storySections.length > 0) {
      return(
        <StoryReader storySection={storySections[0]} authorName={this.props.story.authorName}/>
      );
    }
    return(
      <Container></Container>
    );
  }
}

ShortStory.propTypes = {
  getStorySectionsByStoryId: PropTypes.func.isRequired,
  storySections: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  storySections: state.storySection
});

export default connect(mapStateToProps, { getStorySectionsByStoryId })(ShortStory);
