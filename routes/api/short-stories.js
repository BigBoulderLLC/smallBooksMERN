const express = require('express');
const router = express.Router();

// ShortStory model
const ShortStory = require('../../models/ShortStory');
const StorySection = require('../../models/StorySection');

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
        success: false,
        message: `Error retrieving short story ID ${req.params.id}`
      })
    })
});

// @route   POST api/short-stories
// @desc    Create a Short Story
// @access  Private
router.post('/', (req, res) => {
  let newShortStory = new ShortStory({
    _id: req.body.shortStory._id,
    authorId: req.body.shortStory.authorId,
    author: req.body.shortStory.author,
    name: req.body.shortStory.name,
    description: req.body.shortStory.description,
    story: req.body.shortStory.story,
    author: req.body.shortStory.createdBy,
    createdBy: req.body.shortStory.createdBy,
    updatedBy: req.body.shortStory.updatedBy
  });

  let newStorySection = new StorySection({
    _id: req.body.storySection._id,
    storyId: null,
    title: req.body.storySection.title,
    text: req.body.storySection.text,
    createdBy: req.body.storySection.createdBy,
    updatedBy: req.body.storySection.updatedBy
  });

  newShortStory.save()
    .then(shortStory => {
      console.log(`POST request for story ID ${shortStory._id}`);

      newStorySection.storyId = shortStory._id;
      newStorySection.title = shortStory.name;

      newStorySection.save()
        .then(storySection => {
          console.log(`POST request for story section ID ${storySection._id}`);
        })
        .catch((err) => {
          console.log(err);
          res.json({
            error: "Save Failed"
          })
        })

      res.json(shortStory);
    })
    .catch((err) => {
      console.log(err);
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
