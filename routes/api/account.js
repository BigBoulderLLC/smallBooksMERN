const express = require('express');
const passport = require('passport');
// const Account = require('../../models/Account');
const Router = express.Router();

Router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

Router.get('/register', (req, res) => {
  res.render('register', {});
});

Router.post('/register', (req, res, next) => {
  Account.register(new Account({
    username: req.body.username
  }), req.body.password, (err, account) => {
    if (err) {
      return res.render('register', {error: err.message})
    }

    passport.authenticate('local')(req, res, () => {
      req.session.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect('/');
      });
    });
  });
});

// Router.get('/login', (req,res) => {
//   res.render('login', {user: req.user, error: null})
// });

// Router.post('/login', passport.authenticate('local', 
//   { failureRedirect: '/login', failureFlash: true }), 
//   (req, res, next) => {
//   req.session.save((err) => {
//     if (err) {
//       return next(err);
//     }
//     res.redirect('/');
//   });
// });

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