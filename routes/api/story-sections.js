const express = require('express');
const router = express.Router();

//Errors
const Responses = require('../../lib/Responses');

// storySection model
const StorySection = require('../../models/StorySection');

// @route   GET api/storySections
// @desc    Get all storySections
// @access  Public
router.get('/', (req, res) => {
  let errorMessage = `Get request FAILED retrieving all StorySections`;
  StorySection.find()
    .sort({createdDate: -1})
    .then(storySections => {
      res.json(storySections)
    })
    .catch((err) => {
      console.log(errorMessage);
      console.log(err);
      response.json(Responses.createFailResponse(errorMessage));
    })
});

// @route   GET api/storySections/:id
// @desc    Get a specific storySection by ID
// @access  Public
router.get('/:id', (request, response) => {
  let successMessage = `GET request retrieved StorySection with ID: ${request.params.id}`;
  let errorMessage = `Get request FAILED retrieving StorySection with ID: ${request.params.id}`;
  StorySection.findById(request.params.id)
    .then((storySection) => {
      console.log(successMessage);
      response.json(storySection);
    })
    .catch((err) => {
      console.log(errorMessage);
      console.log(err);
      response.json(Responses.createFailResponse(errorMessage));
    })
});

// @route   GET api/storySections/storyId/:storyId
// @desc    Get a specific set of  storySections by story ID
// @access  Public
router.get('/storyId/:storyId', (request, response) => {
  let successMessage = `GET request retrieved StorySections with storyId: ${request.params.storyId}`;
  let errorMessage = `Get request FAILED retrieving StorySections with storyId: ${request.params.storyId}`;
  StorySection.find({storyId: request.params.storyId})
    .then((storySections) => {
      console.log(successMessage);
      response.json(storySections);
    })
    .catch((err) => {
      console.log(errorMessage);
      console.log(err);
      response.json(Responses.createFailResponse(errorMessage));
    })
});

// @route   POST api/storySection
// @desc    Create a new storySection
// @access  Private
router.post('/', (request, response) => {
  const newStorySection = new StorySection({
    title: request.body.title,
    text: request.body.text,
    createdBy: request.body.createdBy,
    updatedBy: request.body.updatedBy
  });

  let successMessage = `POST request created StorySection: ${request.body.title}`;
  let errorMessage = `POST request FAILED creating StorySection: ${request.body.title}`;
  newStorySection.save()
    .then((storySection) => {
      console.log(successMessage);
      response.json(storySection);
    })
    .catch((err) => {
      console.log(errorMessage);
      console.log(err);
      response.json(Responses.createFailResponse(errorMessage));
    });
});


// @route   DELETE api/storySections
// @desc    Delete a storySections
// @access  Private
router.delete('/:id', (request, response) => {
  let errorMessage = `DELETE request FAILED for StorySection with ID: ${request.params.id}`;
  let successMessage = `DELETE request removed StorySection with ID: ${request.params.id}`;
  StorySection.findById(request.params.id)
    .then((storySectionToDelete) => {
      storySectionToDelete.remove()
        .then(() => {
        	console.log(successMessage);
          response.json(
            successMessage
          );
        })
        .catch((err) => {
          console.log(errorMessage);
          console.log(err);
          response.json(Responses.createFailResponse(errorMessage));
        })
      }
    )
    .catch((err) => {
      console.log(errorMessage);
      console.log(err);
      response.status(404).json(Responses.createFailResponse(errorMessage));
    })
});

module.exports = router;
