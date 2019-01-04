const express = require('express');
const router = express.Router();

// ShortStory model
const ShortStory = require('../../models/ShortStory');

// @route   GET api/short-stories
// @desc    Get All Short stories
// @access  Public
router.get('/', (req, res) => {
  ShortStory.find()
    .sort({ createdDate: -1})
    .then(shortStories => res.json(shortStories))
});

// @route   GET api/short-stories/:id
// @desc    Get a specific short story by ID
// @access  Public
router.get('/:id', (req, res) => {
  ShortStory.findById(req.params.id)
    .then((shortStory) => {
      console.log(`GET request for ID ${req.params.id}`);
      res.json(shortStory)
    })
    .catch(err => {
      console.log(`Error retrieving short story ID ${req.params.id}`);
      res.json({
        success:false,
        message: `Error retrieving short story ID ${req.params.id}`
      })
    })
});

// @route   POST api/short-stories
// @desc    Create a Short Story
// @access  Private
router.post('/', (req, res) => {
  const newShortStory = new ShortStory({
    name: req.body.name,
    description: req.body.description,
    story: req.body.story,
    author: req.body.createdBy,
    createdBy: req.body.createdBy,
    updatedBy: req.body.updatedBy
  });

  newShortStory.save()
    .then(shortStory => res.json(shortStory))
    .catch((err) => {
      console.log(err)
      res.json({
        error: "Save Failed"
      })
    });

});

// @route   PUT api/short-stories
// @desc    Create a Short Story
// @access  Private
router.put('/:id', (req, res) => {
  let errorResponse = "";
  ShortStory.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updatedShortStory => {
      console.log(`Successfully updated Short Story ID: ${req.params.id}`);
      res.json(updatedShortStory);
    })
    .catch(err => {
      errorResponse = `Error Updating Short Story ID: ${req.params.id}`;
      console.log(errorResponse),
      res.json({
        success:false,
        message:errorResponse
      })
    })
});


// @route   DELETE api/short-stories
// @desc    Delete a Short Story
// @access  Private
router.delete('/:id', (req, res) => {
  ShortStory.findById(req.params.id)
    .then((shortStory) => {
      shortStory.remove()
        .then(() => {
          res.json({
            success: true,
            message: "Story successfully deleted"
          })
        })
        .catch(() => {
          console.log("Error occurred attempting to remove story")
        })
      }
    )
    .catch((err) => {
      res.status(404).json({
        success:false,
        message: "Story does not exist"
      });
    })
});

module.exports = router;
