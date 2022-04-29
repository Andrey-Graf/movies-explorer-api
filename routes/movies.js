const movieRouter = require('express').Router();

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

const { validateCreateMovie, validateMovieId } = require('../middlewares/validators');

movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', validateCreateMovie, createMovie);
movieRouter.delete('/movies/:movieId', validateMovieId, deleteMovie);

module.exports = movieRouter;
