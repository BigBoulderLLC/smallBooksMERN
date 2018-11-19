const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();

const db = require('./config/keys').mongoURI;

const shortStories = require('./routes/api/short-stories');
const users = require('./routes/api/user');
const accounts = require('./routes/api/account');
const authors = require('./routes/api/authors');

app.use(express.json());

// connect to Mongo
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch(err => {
    console.log(err)
  });

// Session information
app.use(cookieParser());
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

// use routes
app.use('/api/short-stories', shortStories);
app.use('/api/user', users);
app.use('/api/account', accounts);
app.use('/api/authors', authors);




const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});

