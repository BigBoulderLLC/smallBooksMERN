import React, { Component } from 'react';
import {
  Button,
  ListGroup,
  ListGroupItem
} from 'reactstrap';
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';
import { connect } from 'react-redux';
import { getStories, deleteStory } from '../actions/storyActions';
import ShortStoryListItem from './ShortStoryListItem';
import PropTypes from 'prop-types';

class ShortStoryList extends Component {
  state = {
    storyId: 0
  }

  componentDidMount() {
    this.props.getStories();
  }

  onDeleteClick = (id) => {
    this.props.deleteStory(id);
  }

  render() {
    const { shortStories }  = this.props.shortStories;
      return(
          <TransitionGroup className="short-story-list">
            {shortStories.map((shortStory) => (
              <CSSTransition key={shortStory._id} timeout={500} classNames="fade">
                <ShortStoryListItem shortStory={shortStory} showReadStory={true} />
              </CSSTransition>
            ))}
          </TransitionGroup>
      )
  }
}

ShortStoryList.propTypes = {
  getStories: PropTypes.func.isRequired,
  deleteStory: PropTypes.func.isRequired,
  shortStories: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  shortStories: state.shortStory
});

export default connect(mapStateToProps, { getStories, deleteStory })(ShortStoryList);
