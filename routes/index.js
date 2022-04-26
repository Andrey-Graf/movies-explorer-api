const router = require('express').Router();

const { validateSingUp, validateSignIn } = require('../middlewares/validators');
const { login, createUser, signOut } = require('../controllers/users');
const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signin', validateSignIn, login);
router.post('/signup', validateSingUp, createUser);
router.post('/signout', signOut);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Запршиваемый ресурс не найден'));
});

module.exports = router;
