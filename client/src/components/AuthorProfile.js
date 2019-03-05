import React, { Component } from 'react';
import {
  CardHeader,
  Card,
  CardBody,
  CardTitle,
  CardText,
  Button
} from 'reactstrap';
import ShortStoryList from './ShortStoryList';
import FloatingActionButton from './FloatingActionButton';
import PropTypes from 'prop-types';

class AuthorProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return(
      <div>

        <Card className="mb-3">

          <CardHeader tag="h3">
              {this.props.author.authorName}
          </CardHeader>

          <CardBody>

            {
              this.props.readOnly ?
              null :
              <Button block outline
                color="primary"
                className="mb-2"
                onClick={() => {
                  //GO TO AUTHOR EDIT/MODAL
                  //window.location.href = "/story/" + this.props.shortStory._id;
                }}>
                Edit Author
              </Button>
            }

            <CardTitle>
              Biography
            </CardTitle>

            <CardText>
              {this.props.author.authorBiography}
            </CardText>

            <CardTitle>
              Stories by this Author
            </CardTitle>

            <ShortStoryList readOnly={this.props.readOnly} author={this.props.author} hideAuthors={true}/>

          </CardBody>

        </Card>
        

        {
          this.props.readOnly ?

          null :

          <FloatingActionButton label="Create Story" onClick={this.props.toggleCreatingStory}/>
        }

      </div>

    );
  }
}

AuthorProfile.propTypes = {
  author: PropTypes.object.isRequired
}

export default AuthorProfile;
