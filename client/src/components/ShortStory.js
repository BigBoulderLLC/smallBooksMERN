import React, { Component } from 'react';
import StoryReader from './StoryReader';
import {
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import {getStorySections} from '../actions/storySectionActions';
import PropTypes from 'prop-types';

class ShortStory extends Component {

  state = {
    story: this.props.story,
    storySectionId: 0
  }

  componentDidMount() {
    this.props.getStorySections();
  }

  render() {
    const storySectionId = this.state.storySectionId;
    console.log(this.props.storySections); 
    if (this.props.storySections.length > 0) {
      return(
      <Container>
        <StoryReader storySection={this.props.storySections[0]} authorName={this.props.story.authorName}/>
      </Container>
      );
    }
    return(
      <Container></Container>
    ); 
  }
}

ShortStory.propTypes = {
  getStorySections: PropTypes.func.isRequired,
  storySections: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  storySections: state.storySection
});

export default connect(mapStateToProps, { getStorySections })(ShortStory);