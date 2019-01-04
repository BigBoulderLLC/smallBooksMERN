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
        <ListGroup>
          <TransitionGroup className="short-story-list">
            {shortStories.map(({_id, name}) => (
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
}

const mapStateToProps = (state) => ({
  shortStories: state.shortStory
});

export default connect(mapStateToProps, { getStories, deleteStory })(ShortStoryList);
