const mongoose = require('mongoose');
const isUrl = require('validator/lib/isURL');

const {
  MOVIE_SCHEMA_REQUIRED,
  BAD_URL,
} = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED.COUNTRY],
  },
  director: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED.DIRECTOR],
  },
  duration: {
    type: Number,
    required: [true, MOVIE_SCHEMA_REQUIRED.DURATION],
  },
  year: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED.YEAR],
  },
  description: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED.DESCRIPTION],
  },
  image: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED.IMAGE],
    validate: {
      validator: (v) => isUrl(v),
      message: BAD_URL,
    },
  },
  trailerLink: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED.TRAILERLINK],
    validate: {
      validator: (v) => isUrl(v),
      message: BAD_URL,
    },
  },
  thumbnail: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED.THUMBNAIL],
    validate: {
      validator: (v) => isUrl(v),
      message: BAD_URL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, MOVIE_SCHEMA_REQUIRED.OWNER],
  },
  movieId: {
    type: Number,
    required: [true, MOVIE_SCHEMA_REQUIRED.MOVIE_ID],
  },
  nameRU: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED.NAME_RU],
  },
  nameEN: {
    type: String,
    required: [true, MOVIE_SCHEMA_REQUIRED.NAME_EN],
  },
});

module.exports = mongoose.model('movie', movieSchema);
