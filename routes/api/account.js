const express = require('express');
// const passport = require('passport');
const Account = require('../../models/Account');
const Router = express.Router();
const Responses = require('../../lib/Responses');
const session = require('express-session');

const ResponseGenerator = new Responses();


Router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

Router.get('/register', (req, res) => {
  res.render('register', {});
});

Router.post('/register', (req, res) => {
  const account = new Account({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    passwordConf: req.body.passwordConf
  });
  account.save()
    .then(account => {
      req.session.userId = account.id
      res.json(ResponseGenerator.createSuccessResponse("Account Created."))
    })
    .catch((err) => {
      console.log(err)
      res.json(ResponseGenerator.createFailResponse("Account Creation Failed."))
    });
});

// Router.get('/login', (req,res) => {
//   res.render('login', {user: req.user, error: null})
// });

Router.post('/login', (req, res) => {
  Account.findOne({username:req.body.username}, (err, user) => {
    if (err) {
      console.log(err)
      return
    }
    req.session.userId = user._id
    console.log(req.session)
  });
});

// Router.get('/logout', (req,res,next) => {
//   req.logout();
//   req.session.save((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/');
//   })
// });

// Router.get('/ping', (req,res) => {
//   res.status(200).send("pong!");
// });

module.exports = Router;