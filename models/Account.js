const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const handleE11000 = function(error, res, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    let errorMessage = error.errMsg
    let field = errorMessage.slice(indexOf('$'), indexOf('_'))
    next(new Error('The ' + field.charAt(0).toUpperCase() + field.slice(1) + ' entered has already been claimed.'))
  } else {
    next();
  }
}

const Account = new Schema({
  email: {
    type: String,
    required: true,
    unique:true,
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
  fullName: {
    type: String,
    required: false
  },
  phoneNumber: {
    type: String,
    required: false
  },
  phoneNumberType: {
    type: String,
    required: false
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



Account.statics.authenticate = function(username, password, callback) {
  let myAccount = this
  console.log("Authenticating username: " + username)
  myAccount.findOne({username: username})
    .exec((err, account) => {
      let msg = "User " + username + " not found"
      if (err) {
        return callback(err)
      } else if (!account) {
        console.log(msg)
        let err = new Error(msg)
        err.status = 401
        return callback(err)
      }
      bcrypt.compare(password, account.password, (err, result) => {
        if (result === true) {
          console.log("User " + username + " found")
          return callback(null, account)
        } else {
          console.log(msg)
          let err = new Error(msg)
          err.status = 401
          return callback(err)
        }
      })
    })
}

module.exports = mongoose.model('accounts', Account)