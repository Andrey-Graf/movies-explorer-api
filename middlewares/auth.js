const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { JWT_SECRET } = require('../utils/secretJwt');

const { NOT_AUTH_ERROR } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(NOT_AUTH_ERROR);
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new UnauthorizedError(NOT_AUTH_ERROR);
  }
  req.user = payload;
  next();
};
