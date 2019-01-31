import React, { Component } from 'react';
import {
  Button,
  ListGroup,
  ListGroupItem,
  Card,
  CardTitle
} from 'reactstrap';
import {
  CSSTransition,
  TransitionGroup
} from 'react-transition-group';
import { connect } from 'react-redux';
import { getStories, deleteStory } from '../actions/storyActions';
import ShortStoryListItem from './ShortStoryListItem';
import CreateShortStory from './CreateShortStory';
import PropTypes from 'prop-types';

class ShortStoryList extends Component {
  state = {
    storyId: 0
  }

  componentDidMount() {
    //get all stories if we are browsing stories
    this.props.getStories();

    //get only our stories if we are looking at My Stories

  }

  render() {
    const { shortStories }  = this.props.shortStories;

    return(

      <div>

        <TransitionGroup className="short-story-list">

          {shortStories.map((shortStory) => (

            <CSSTransition key={shortStory._id} timeout={500} classNames="fade">

              <ShortStoryListItem shortStory={shortStory} hideAuthor={this.props.hideAuthors} showReadStory={true} showEditStory={!this.props.readOnly} />

            </CSSTransition>

          ))}

        </TransitionGroup>

      </div>

    )
  }
}

ShortStoryList.propTypes = {
  getStories: PropTypes.func.isRequired,
  deleteStory: PropTypes.func.isRequired,
  shortStories: PropTypes.object.isRequired
  //author (not required)
}

const mapStateToProps = (state) => ({
  shortStories: state.shortStory
});

export default connect(mapStateToProps, { getStories, deleteStory })(ShortStoryList);
