const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const secretJwt = require('../utils/secretJwt');

const { NOT_AUTH_ERROR } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(NOT_AUTH_ERROR);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, secretJwt);
  } catch (err) {
    throw new UnauthorizedError(NOT_AUTH_ERROR);
  }
  req.user = payload;
  next();
};
