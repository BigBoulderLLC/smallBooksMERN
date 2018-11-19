const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
// const passportLocalMongoose = require('passport-local-mongoose');

const Account = new Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  passwordConf: {
    type: String,
    required: true
  }
})

Account.pre('save', function(next) {
  let account = this
  console.log("I'm here")
  console.log(account);
  bcrypt.hash(account.password, 10, function(err, hash) {
    if (err) {
      return next(err)
    }
    account.password = hash
    next()
  })
})

// Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('accounts', Account)