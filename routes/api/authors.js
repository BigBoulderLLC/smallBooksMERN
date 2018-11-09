const express = require('express');
const router = express.Router();

//Errors
const Responses = require('../../lib/Responses');

// Author model
const Author = require('../../models/Author');

// @route   GET api/authors
// @desc    Get all authors
// @access  Public
router.get('/', (req, res) => {
  Author.find()
    .sort({ createdDate: -1})
    .then(authors => {
      res.json(authors)
      res.send("<div><p>Hello There</p></div>")
    })
});

// @route   GET api/authors/:id
// @desc    Get a specific author by ID
// @access  Public
router.get('/:id', (request, response) => {
  let successMessage = `GET request retrieved Author with ID: ${request.params.id}`;
  let errorMessage = `Get request FAILED retrieving Author with ID: ${request.params.id}`;
  Author.findById(request.params.id)
    .then((author) => {
      console.log(successMessage);
      response.json(author);
    })
    .catch((err) => {
      console.log(errorMessage);
      console.log(err);
      response.json(Responses.createFailResponse(errorMessage));
    })
});

// @route   POST api/author
// @desc    Create a new Author
// @access  Private
router.post('/', (request, response) => {
  const newAuthor = new Author({
    authorName: request.body.authorName,
    authorBiography: request.body.authorBiography,
    authorImage: request.body.authorImage,
    createdBy: request.body.createdBy,
    updatedBy: request.body.updatedBy
  });

  let successMessage = `POST request created Author: ${request.body.authorName}`;
  let errorMessage = `POST request FAILED creating Author: ${request.body.authorName}`;
  newAuthor.save()
    .then((author) => {
      console.log(successMessage);
      response.json(author);
    })
    .catch((err) => {
      console.log(errorMessage);
      console.log(err);
      response.json(Responses.createFailResponse(errorMessage));
    });
});


// @route   DELETE api/authors
// @desc    Delete a Author
// @access  Private
router.delete('/:id', (request, response) => {
  let errorMessage = `DELETE request FAILED for Author with ID: ${request.params.id}`;
  let successMessage = `DELETE request removed Author with ID: ${request.params.id}`;
  Author.findById(request.params.id)
    .then((authorToDelete) => {
      authorToDelete.remove()
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
