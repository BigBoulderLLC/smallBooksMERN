const express = require('express');
// const passport = require('passport');
const Account = require('../../models/Account');
const Router = express.Router();
const Responses = require('../../lib/Responses');
const session = require('express-session');

const ResponseGenerator = new Responses();
const Tokenizer = require('../../lib/Tokenizer');


Router.get('/', (req, res) => {
  res.render('index', { user: req.user });
});

Router.get('/register', (req, res) => {
  res.render('register', {});
});

Router.post('/register', (req, res) => {
  console.log(`POST Request for registration for username ${req.body.username}`)
  const account = new Account({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    passwordConf: req.body.passwordConf
  });
  account.save()
    .then(account => {
      let username = account.username
      let response = ResponseGenerator.createSuccessResponse("Account Created")
      let options = {
        issuer: "https://smallBooks.com",
        subject: "smallBooks",
        audience: "dev-api",
        expiresIn: "12h",
        algorithm: "RS256"
      }
      let token = Tokenizer.sign({username:username}, options);
      response["token"] = token
      response["username"] = username
      res.json(response)
    })
    .catch((err) => {
      res.json(ResponseGenerator.createFailResponse(err))
    });
});

// Router.get('/login', (req,res) => {
//   res.render('login', {user: req.user, error: null})
// });

Router.post('/login', (req, res) => {
  let username = req.body.username
  let password = req.body.password
  console.log(`POST Request for Login for username ${username}`)
  Account.authenticate(username, password, (err, user) => {
    if (err) {
      res.json(ResponseGenerator.createFailResponse("Login Failed")) 
    } else {
      let options = {
        issuer: "https://smallBooks.com",
        subject: "smallBooks",
        audience: "dev-api",
        expiresIn: "12h",
        algorithm: "RS256"
      }
      let token = Tokenizer.sign({username:req.body.username}, options);
      let response = ResponseGenerator.createSuccessResponse("Login Successful")
      response["token"] = token
      response["username"] = username
      res.json(response)
    } 
  })
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