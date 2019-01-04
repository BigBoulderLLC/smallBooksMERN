const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Changes to Documents in this schema require verification of a JWT -> check out Tokenizer.js */

// create Schema
const AuthorSchema = new Schema({
  authorName: {
    type: String,
    required: true
  },
  authorBiography: {
    type: String
  },
  authorImage: {
    //how will this be implemented?
    type: String
  },
  createdDate: {
    type: Date,
    default: Date.now()
  },
  createdBy: {
    type: String,
    required: true
  },
  updatedDate: {
    type: Date,
    default: Date.now()
  },
  updatedBy: {
    type: String,
    required: true
  }
});

module.exports = Author = mongoose.model('author', AuthorSchema);
