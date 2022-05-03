const PORT_NUMB = 3000;
const ALLOWED_CORS = [
  'https://movies.alebedev.nomoredomains.work',
  'http://movies.alebedev.nomoredomains.work',
  'http://localhost:3000',
];
const NOT_FOUND_ERROR_MESSAGE = 'Запрашиваемый ресурс не найден';
const BAD_URL = 'Неверный формат ссылки';
const NOT_AUTH_ERROR = 'Необходима авторизация';
const NOT_FOUND_MOVIE_ERROR = 'Фильм с указанным "_id" не найден';
const FORBIDDEN_MOVIE_ERROR = 'Нельзя удалять чужой фильм';
const BAD_ID_ERROR = 'Невалидный "_id"';
const NOT_AUTH_ERROR_EMAIL_PASSWORD = 'Неправильные почта или пароль';
const BAD_REQ_ERROR = 'Ошибка валидации';
const USER_EMAIL_ERROR = 'Пользователь с таким email уже существует';
const NOT_USER_ERROR = 'Пользователя несуществует';
const SERVER_ERROR = 'Ошибка сервера';
const VALIDATION_ERROR = 'ValidationError';
const NOT_FOUND_ERROR = 'NotFound';
const OBJECT_ID = 'ObjectId';
const MONGO_ERROR = 'MongoError';
const REQUEST_LOG = 'request.log';
const ERROR_LOG = 'error.log';

const USER_SCHEMA_REQUIRED = {
  EMAIL: 'Поле-строка "email - электронная почта" является обязательным',
  PASSWORD: 'Поле-строка "password - пароль" является обязательным',
  NAME: 'Поле-строка "name - имя пользователя" является обязательным',
};
const USER_SCHEMA_VALIDATE = {
  EMAIL: 'Не является email',
  PASSWORD: 'Внесённый пароль не является надёжным',
  NAME: 'Не соответсвует диапазону длины строки - от 2 до 30 символов',
};

const MOVIE_SCHEMA_REQUIRED = {
  COUNTRY: 'Поле-строка "country - страна" является обязательным',
  DIRECTOR: 'Поле-строка "director - режиссёр" является обязательным',
  DURATION: 'Поле-число "duration - хронометраж" является обязательным',
  YEAR: 'Поле-строка "year - год" является обязательным',
  DESCRIPTION: 'Поле-строка "description - описание" является обязательным',
  IMAGE: 'Поле-строка "image - ссылка на постер к фильму" является обязательным',
  TRAILERLINK: 'Поле-строка "trailer - ссылка на трейлер фильма" является обязательным',
  THUMBNAIL: 'Поле-строка "thumbnail - миниатюрное изображение постера к фильму" является обязательным',
  OWNER: 'Поле-строка "owner - _id пользователя, который сохранил статью" является обязательным',
  MOVIE_ID: 'Поле-число "movieId - id фильма, который содержится в ответе сервиса MoviesExplorer" является обязательным',
  NAME_RU: 'Поле-строка "nameRU - название фильма на русском языке" является обязательным',
  NAME_EN: 'Поле-строка "nameEN - название фильма на английском языке" является обязательным',
};

module.exports = {
  PORT_NUMB,
  ALLOWED_CORS,
  NOT_FOUND_ERROR_MESSAGE,
  BAD_URL,
  NOT_AUTH_ERROR,
  NOT_FOUND_MOVIE_ERROR,
  FORBIDDEN_MOVIE_ERROR,
  BAD_ID_ERROR,
  NOT_AUTH_ERROR_EMAIL_PASSWORD,
  BAD_REQ_ERROR,
  USER_EMAIL_ERROR,
  NOT_USER_ERROR,
  SERVER_ERROR,
  VALIDATION_ERROR,
  NOT_FOUND_ERROR,
  OBJECT_ID,
  MONGO_ERROR,
  REQUEST_LOG,
  ERROR_LOG,
  USER_SCHEMA_REQUIRED,
  USER_SCHEMA_VALIDATE,
  MOVIE_SCHEMA_REQUIRED,
};
