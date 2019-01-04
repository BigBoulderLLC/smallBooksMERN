'use strict'

const fs = require('fs')
const jwt = require('jsonwebtoken')

// PRIVATE and PUBLIC keys
const privateKey = fs.readFileSync('config/private.key', 'utf8');
const publicKey = fs.readFileSync('config/public.key', 'utf8');

module.exports = {
  sign: (payload, $Options) => {
    let signOptions = {
      issuer: $Options.issuer,
      subject: $Options.subject,
      audience: $Options.audience,
      expiresIn: "12h",
      algorithm: "RS256"
    }
    return jwt.sign(payload, privateKey, signOptions)
  },

  verify: (token, $Option) => {
    let verifyOptions = {
      issuer: $Option.issuer,
      subject: $Option.subject,
      audience: $Option.audience,
      expiresIn: "12h",
      algorithm: ["RS256"]
    }
    try{
      return jwt.verify(token, publicKey, verifyOptions)
    } catch(err) {
      return false
    }
  },

  decode: (token) => {
    return jwt.decode(token, {complete: true});
  }
}

