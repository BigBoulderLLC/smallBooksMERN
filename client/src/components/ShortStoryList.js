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
    const stories = Object.values(shortStories)
      return(
        <ListGroup>
          <TransitionGroup className="short-story-list">
            {stories.map(({_id, name}) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {name}
                  <Button
                    color="dark"
                    size="sm"
                    className="pull-right"
                    onClick={() => {
                      window.location.href = "/story/" + _id;
                    }}>
                    Read Story
                  </Button>
                  <Button
                    color="danger"
                    size="sm"
                    className="pull-right"
                    style={{marginRight:"10px"}}
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                    Delete Story
                  </Button>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
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
