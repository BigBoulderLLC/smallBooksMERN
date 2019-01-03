const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const StorySectionSchema = new Schema({
  storyId: {
    type: Schema.Types.ObjectId
  },
  title: {
    type: String
  },
  text: {
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: String,
    required: true
  },
  updatedDate: {
    type: Date,
    default: Date.now
  },
  updatedBy: {
    type: String,
    required: true
  }
});

module.exports = StorySection = mongoose.model('story-section', StorySectionSchema);
