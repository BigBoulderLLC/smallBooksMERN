const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String
  },
  email: {
    //Should we require an email?
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

module.exports = User = mongoose.model('user', UserSchema);
