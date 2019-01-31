import React, { Component } from 'react';
import AuthorProfile from './AuthorProfile';
import CreateShortStory from './CreateShortStory';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { getAuthors } from '../actions/authorActions';
import PropTypes from 'prop-types';


class MyStories extends Component {

  state = {
    authorId: 0,
    isCreating: false
  }

  componentDidMount() {
    this.props.getAuthors();
  }

  toggleCreatingStory = () => {
  	this.setState({
      isCreating: !this.state.isCreating
    });
  }

  render() {

    const { authors }  = this.props.authors;
    //get only our author after user is tied to author
    let author = authors[1];

    return (
      <Container>
      	{
      		this.state.isCreating ?

      		<CreateShortStory author={author} toggleCreatingStory={this.toggleCreatingStory}/> :

      		author ?

        	<AuthorProfile author={author} readOnly={false} toggleCreatingStory={this.toggleCreatingStory}/> :

        	null
  		}

      </Container>
    );
  }
}

MyStories.propTypes = {
  getAuthors: PropTypes.func.isRequired,
  authors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  authors: state.author
});

export default connect(mapStateToProps, { getAuthors })(MyStories);