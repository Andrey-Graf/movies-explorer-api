const userRouter = require('express').Router();

const {
  getUsers,
  updateUser,
} = require('../controllers/users');

const { validateUpdateUser } = require('../middlewares/validators');

userRouter.get('/me', getUsers);
userRouter.patch('/me', validateUpdateUser, updateUser);

module.exports = userRouter;
