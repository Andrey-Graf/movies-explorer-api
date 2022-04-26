const movieRouter = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { validateCreateMovie, validateMovieId } = require('../middlewares/validators');

movieRouter.get('/', getMovies);
movieRouter.post('/', validateCreateMovie, createMovie);
movieRouter.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = movieRouter;
