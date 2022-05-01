const { SERVER_ERROR } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = status === 500 ? SERVER_ERROR : err.message;
  res.status(status).send({ message });
  next();
};

module.exports = errorHandler;
