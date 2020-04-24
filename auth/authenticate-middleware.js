const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const secret = 'keep this a secret';
  if (authorization){
      jwt.verify(authorization, secret , (err, decoded) => {
        if(err){
          res.status(401).json({ you: 'invalid token' });
        }else{
          req.decodedUser = decoded
          next()
        }
      })
  }else{
    res.status(401).json({ you: 'you dont have the token to pass' });
  }
};