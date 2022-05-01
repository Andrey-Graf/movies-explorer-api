const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadReqError = require('../errors/BadReqError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');
const {
  VALIDATION_ERROR,
  NOT_FOUND_ERROR,
  MONGO_ERROR,
  NOT_AUTH_ERROR_EMAIL_PASSWORD,
  BAD_REQ_ERROR,
  USER_EMAIL_ERROR,
} = require('../utils/constants');

const { JWT_SECRET } = require('../utils/secretJwt');

module.exports.getUsers = (req, res, next) => {
  const owner = req.user._id;
  User.findById(owner)
    .then((users) => res.status(200).send(users))
    .catch(next);
};
// Обновить информацию создоного пользователя.
module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { email, name },
    { new: true, runValidators: true },
  )
    .orFail(new Error(NOT_FOUND_ERROR))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadReqError(BAD_REQ_ERROR));
      } else if (err.name === MONGO_ERROR && err.code === 11000) {
        next(new ConflictError(err.message));
      } else {
        next(err);
      }
    })
    .catch(next);
};
// Создать пользователя.
module.exports.createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;
  User.findOne({ email })
    .then((userEmail) => {
      if (userEmail) {
        next(new ConflictError(USER_EMAIL_ERROR));
      } else {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({
            email,
            password: hash,
            name,
          }))
          .then((user) => res.status(200).send(user.toJSON()))
          .catch((err) => {
            if (err.name === VALIDATION_ERROR) {
              next(new BadReqError(BAD_REQ_ERROR));
            } else if (err.name === MONGO_ERROR && err.code === 11000) {
              next(new ConflictError(USER_EMAIL_ERROR));
            } else {
              next(err);
            }
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
      }).send({ token });
    })
    .catch(() => {
      throw new UnauthorizedError(NOT_AUTH_ERROR_EMAIL_PASSWORD);
    })
    .catch(next);
};

module.exports.signOut = (req, res) => {
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: true,
  })
    .status(200).send({ message: 'Куки удалены' });
};
