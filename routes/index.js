const router = require('express').Router();
const { NOT_FOUND_ERROR_MESSAGE } = require('../utils/constants');

const { validateSingUp, validateSignIn } = require('../middlewares/validators');
const { login, createUser, signOut } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSingUp, createUser);
router.post('/signout', signOut);

router.use(auth, userRouter);
router.use(auth, movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_ERROR_MESSAGE));
});

module.exports = router;
