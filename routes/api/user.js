const express = require('express');
const router = express.Router();

//Errors
const Responses = require('../../lib/Responses');

// User model
const User = require('../../models/User');

// @route   GET api/user/:id
// @desc    Get a specific user by ID
// @access  Public
router.get('/:id', (request, response) => {
  let successMessage = `GET request retrieved user with ID: ${request.params.id}`;
  let errorMessage = `Get request FAILED retrieving user with ID: ${request.params.id}`;
  User.findById(request.params.id)
    .then((user) => {
      console.log(successMessage);
      response.json(user);
    })
    .catch((err) => {
      console.log(errorMessage);
      console.log(err);
      response.json(Responses.createFailResponse(errorMessage));
    })
});

// @route   POST api/user
// @desc    Create a new User
// @access  Private
router.post('/', (request, response) => {
  const newUser = new User({
    username: request.body.username,
    password: request.body.password,
    email: request.body.email,
    createdBy: request.body.createdBy,
    updatedBy: request.body.updatedBy,
    createdDate: Date.now,
    updatedDate: Date.now
  });

  let successMessage = `POST request created user: ${request.body.username}`;
  let errorMessage = `POST request FAILED creating user: ${request.body.username}`;
  newUser.save()
    .then((user) => {
      console.log(successMessage);
      response.json(user);
    })
    .catch((err) => {
      console.log(errorMessage);
      console.log(err);
      response.json(Responses.createFailResponse(errorMessage));
    });
});


// @route   DELETE api/user
// @desc    Delete a User
// @access  Private
router.delete('/:id', (request, response) => {
  let errorMessage = `DELETE request FAILED for user with ID: ${request.params.id}`;
  let successMessage = `DELETE request removed user with ID: ${request.params.id}`;
  User.findById(request.params.id)
    .then((userToDelete) => {
      userToDelete.remove()
        .then(() => {
          response.json(
            Responses.createSuccessResponse(successMessage)
          )
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
