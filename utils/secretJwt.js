require('dotenv').config();

const { NODE_ENV, JWT_SECRET, MONGO_DB } = process.env;

module.exports = {
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret',
  MONGO_DB: NODE_ENV === 'production' ? MONGO_DB : 'mongodb://localhost:27017/moviesdb',
};
