const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const keys = require('./keys.env');

const app = express();
const db = require('./config/keys').mongoURI;
const S3 = new AWS.S3();


const shortStories = require('./routes/api/short-stories');
const storySections = require('./routes/api/story-sections');
const users = require('./routes/api/user');
const accounts = require('./routes/api/account');
const authors = require('./routes/api/authors');

app.use(express.json());
AWS.config.update({
  accessKeyId: "AKIAJOJNJWJHSJCQPPCA",
  secretAccessKey: "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"
});

// connect to Mongo
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(() => {
    console.log('MongoDB Connected')
  })
  .catch(err => {
    console.log(err)
  });

// use routes
app.use('/api/short-stories', shortStories);
app.use('/api/story-sections', storySections);
app.use('/api/user', users);
app.use('/api/account', accounts);

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

const filePath = "./data.txt";
const params = {
  Bucket: 'small-books',
  Body : fs.createReadStream(filePath),
  Key : "folder/"+Date.now()+"_"+path.basename(filePath)
};

S3.upload(params, function (err, data) {
  //handle error
  if (err) {
    console.log("Error", err);
  }
  //success
  if (data) {
    console.log("Uploaded in:", data.Location);
  } else {
    console.log("Uh oh... ");
  }
});