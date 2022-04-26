const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadReqError = require('../errors/BadReqError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

require('dotenv').config();

const { NODE_ENV, JWT_SECRET } = process.env;

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
    .orFail(new Error('NotFound'))
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReqError('Переданы некорректные данные при обновлении профиля'));
      } else if (err.message === 'NotFound') {
        next(new NotFoundError('Пользователя несуществует'));
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
        next(new ConflictError(`Пользователь с таким ${email} уже существует`));
      } else {
        bcrypt.hash(password, 10)
          .then((hash) => User.create({
            email,
            password: hash,
            name,
          }))
          .then((user) => res.status(200).send(user.toJSON()))
          .catch((err) => {
            if (err.name === 'ValidationError') {
              next(new BadReqError('Ошибка валидации'));
            } else if (err.name === 'MongoError' && err.code === 11000) {
              next(new ConflictError('Пользователь с таким email уже существует'));
            }
          })
          .catch(next);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, {
        httpOnly: true,
        sameSite: true,
      }).send({ token });
    })
    .catch(() => {
      throw new UnauthorizedError('Необходимо авторизоваться');
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
