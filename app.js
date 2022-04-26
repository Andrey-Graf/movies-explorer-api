const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');

require('dotenv').config();

const cors = require('cors');

const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');

const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHander = require('./middlewares/errorHander');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors({
  origin: [
    'https://movies.alebedev.nomoredomains.work',
    'http://movies.alebedev.nomoredomains.work',
    'http://localhost:3000',
  ],
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Authorization', 'Content-Type'],
  credentials: true,
}));

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(errorHander);
app.listen(PORT, () => {
  console.log(`App listener on port ${PORT}`);/* eslint-disable-line no-console */
});
