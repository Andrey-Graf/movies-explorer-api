const Movie = require('../models/movie');
const BadReqError = require('../errors/BadReqError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const ConflictError = require('../errors/ConflictError');

const {
  VALIDATION_ERROR,
  OBJECT_ID,
  NOT_FOUND_MOVIE_ERROR,
  FORBIDDEN_MOVIE_ERROR,
  BAD_ID_ERROR,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => res.status(200).send(movies))
    .catch((err) => {
      next(err);
    });
};
// Создать фильм.
module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === VALIDATION_ERROR) {
        next(new BadReqError(err.message));
      } else if (err.code === 11000) {
        throw new ConflictError(err.message);
      } else {
        next(err);
      }
    })
    .catch((err) => {
      next(err);
    });
};
// Удолить фильм.
module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundError(NOT_FOUND_MOVIE_ERROR))
    .then((movie) => {
      if (req.user._id === movie.owner.toString()) {
        return movie.remove()
          .then(() => res.status(200).send({ message: 'Фильм удалён успешно' }));
      }
      throw new ForbiddenError(FORBIDDEN_MOVIE_ERROR);
    })
    .catch((err) => {
      if (err.kind === OBJECT_ID) {
        next(new BadReqError(BAD_ID_ERROR));
      }
      next(err);
    });
};
