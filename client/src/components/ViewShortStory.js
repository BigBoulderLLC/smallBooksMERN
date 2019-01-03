import React, { Component } from 'react';
import ShortStory from './ShortStory';
import {
  Container
} from 'reactstrap';
import { connect } from 'react-redux';
import { getStoryById } from '../actions/storyActions';
import PropTypes from 'prop-types';

class ViewShortStory extends Component {

  componentDidMount() {
    this.props.getStoryById(this.props.storyId);
  }

  render() {
    let { shortStories, loading }  = this.props.shortStories;
    if (!loading && !Array.isArray(shortStories)) {
      return(
        <ShortStory story={shortStories}/>
      );
    }
    else {
      return(
        <Container>Loading</Container>
      );
    }
  }
}

ViewShortStory.propTypes = {
  getStoryById: PropTypes.func.isRequired,
  shortStories: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  shortStories: state.shortStory
});

export default connect(mapStateToProps, { getStoryById })(ViewShortStory);
