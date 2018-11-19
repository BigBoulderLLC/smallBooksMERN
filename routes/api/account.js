const express = require('express');
// const passport = require('passport');
const Account = require('../../models/Account');
const Router = express.Router();
const Responses = require('../../lib/Responses');

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
  })
  console.log(account)
  account.save()
    .then(account => res.json(ResponseGenerator.createSuccessResponse("Account Created.")))
    .catch((err) => {
      console.log(err)
      res.json(ResponseGenerator.createFailResponse("Account Creation Failed."))
    });
});

// Router.get('/login', (req,res) => {
//   res.render('login', {user: req.user, error: null})
// });

Router.post('/login', (req, res, next) => {
  req.session.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
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