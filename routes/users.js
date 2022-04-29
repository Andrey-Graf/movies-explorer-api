const userRouter = require('express').Router();

const {
  getUsers,
  updateUser,
} = require('../controllers/users');

const { validateUpdateUser } = require('../middlewares/validators');

userRouter.get('/users/me', getUsers);
userRouter.patch('/users/me', validateUpdateUser, updateUser);

module.exports = userRouter;
