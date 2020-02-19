const jwt = require('jsonwebtoken');

const secret = process.env.SECRET;

//authenticate function:
const authenticate = (req, res, next) => {
  const token = req.headers['x-auth-token'];

  try {
    const { id, name, handle } = jwt.verify(token, new Buffer(secret, 'base64'));
    req.user = { id, name, handle };
    next();
  }
  catch(error) {
    res.status(401).send({ error: 'Unable to authenticate - Please use a valid token'});
  }
}

module.exports = {
  authenticate,
}