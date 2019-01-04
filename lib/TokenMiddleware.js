const Tokenizer = require('./Tokenizer');

function checkToken(req,res,next) {
  let token = req.headers['x-access-token'] || req.headers['authorization']
  // if (token.startsWith('Bearer ')) {
  //   toek
  // }
  let options = {
    issuer: "https://smallBooks.com",
    subject: "smallBooks",
    audience: "dev-api",
    expiresIn: "12h",
    algorithm: "RS256"
  }
  if (token) {
    let result = Tokenizer.verify(token, options)
    if (!result) {
      return res.json({
        success:false,
        message:"Invalid token"
      })
    } else {
      req.decoded = decoded
      next()
    }
  } else {
    return res.json({
      success: false,
      message: "Token was not supplied with message"
    })
  }
}

module.exports = {
  checkToken: checkToken
}