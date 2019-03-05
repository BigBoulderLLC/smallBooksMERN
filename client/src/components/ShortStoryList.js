import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getStories, deleteStory } from '../actions/storyActions';
import ShortStoryListItem from './ShortStoryListItem';
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

        {
          Array.isArray(shortStories) ?

          shortStories.map((shortStory) => (
              <ShortStoryListItem shortStory={shortStory} hideAuthor={this.props.hideAuthors} showReadStory={true} showEditStory={!this.props.readOnly} />
          ))

          : <ShortStoryListItem shortStory={shortStories} hideAuthor={this.props.hideAuthors} showReadStory={true} showEditStory={!this.props.readOnly} />
        }

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
