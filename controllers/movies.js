const Movie = require('../models/movie');
const BadReqError = require('../errors/BadReqError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

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
  Movie.create({
    country: req.body.country,
    director: req.body.director,
    duration: req.body.duration,
    year: req.body.year,
    description: req.body.description,
    image: req.body.image,
    trailerLink: req.body.trailerLink,
    thumbnail: req.body.thumbnail,
    movieId: req.movie._id,
    nameRU: req.body.nameRU,
    nameEN: req.body.nameEN,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadReqError('Ошибка при валидации'));
      }
    })
    .catch((err) => {
      next(err);
    });
};
// Удолить фильм.
module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .orFail(new Error('NotFound'))
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        next(new ForbiddenError('Нельзя удалить чужую карточку'));
      } else {
        Movie.deleteOne(movie)
          .then((deletedMovie) => res.status(200).send({ message: `Карточка ${deletedMovie.id} успешно удалена` }));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadReqError('Передан некоректный "id"'));
      } else if (err.message === 'NotFound') {
        next(new NotFoundError('Карточка с данным "id" не существует'));
      }
    })
    .catch((err) => {
      next(err);
    });
};
