const express = require('express');
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
  const { email, username, password } = req.body;
  const account = new Account({
    email: email,
    username: username,
    password: password
  });
  account.save()
    .then(account => {
      let response = ResponseGenerator.createSuccessResponse("Account Created", account);
      let options = {
        issuer: "https://smallBooks.com",
        subject: "smallBooks",
        audience: "dev-api",
        expiresIn: "12h",
        algorithm: "RS256"
      };
      let token = Tokenizer.sign({username:username}, options);
      response["token"] = token;
      res.json(response);
    })
    .catch(err => {
      res.json(ResponseGenerator.createFailResponse(err));
    });
});

Router.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  Account.authenticate(username, password, (err, user) => {
    if (err) {
      res.json(ResponseGenerator.createFailResponse("Login Failed")) ;
    } else {
      let options = {
        issuer: "https://smallBooks.com",
        subject: "smallBooks",
        audience: "dev-api",
        expiresIn: "12h",
        algorithm: "RS256"
      };
      let token = Tokenizer.sign({username:user.username}, options);
      let response = ResponseGenerator.createSuccessResponse("Login Successful", user);
      response["token"] = token;
      res.json(response);
    } 
  })
});

module.exports = Router;