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
  bcrypt.hash(account.password, 10, function(err, hash) {
    if (err) {
      return next(err)
    }
    account.password = hash
    next()
  })
})

Account.statics.authenticate = (username, password, callback) => {
  Account.findOne({username: username})
    .exec((err, account) => {
      if (err) {
        return callback(err)
      } else if (!account) {
        let err = new Error('User not found.');
        err.status = 401;
        return callback(err)
      }
      bcrypt.compare(password, account, (err, result) => {
        if (result === true) {
          return callback(null, account);
        } else {
          return callback();
        }
      })
    })
}

// Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('accounts', Account)