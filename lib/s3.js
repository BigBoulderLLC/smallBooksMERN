const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
AWS.config.loadFromPath('./config/awsConfig.json'); // must be path from project root, not relative path

module.exports = {

  uploadFile: (filename, directory) => {
    return new Promise((resolve, reject) => {
      const S3 = new AWS.S3({apiVersion: '2006-03-01'});
      // Configure the file stream and obtain the upload parameters
      const fileStream = fs.createReadStream(filename);
      fileStream.on('error', function(err) {
        console.log('File Error', err);
      });

      const uploadParams = {
        Bucket: 'small-books/'.concat(directory), 
        Key: path.basename(filename), 
        Body: fileStream
      };

      // call S3 to retrieve upload file to specified bucket
      S3.upload(uploadParams, function(err, data) {
        if (err) {
          // Error is returned and can be handled in .catch()
          reject(err);
        } 
        if (data) {
          /*
           * Data is returned in object with following fields: 
           * {ETag, Location (useful for fetching images in html), Key, Bucket}
           * Can be saved in .then()
           */
          resolve(data);
        }
      });
    });
  }
}