const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const isStrongPassword = require('validator/lib/isStrongPassword');
const isLength = require('validator/lib/isLength');
const {
  USER_SCHEMA_REQUIRED,
  USER_SCHEMA_VALIDATE,
  NOT_AUTH_ERROR_EMAIL_PASSWORD,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, USER_SCHEMA_REQUIRED.EMAIL],
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
      message: USER_SCHEMA_VALIDATE.EMAIL,
    },
  },
  password: {
    type: String,
    required: [true, USER_SCHEMA_REQUIRED.PASSWORD],
    minlength: 8,
    select: false,
    validate: {
      validator: (v) => isStrongPassword(v),
      message: USER_SCHEMA_VALIDATE.PASSWORD,
    },
  },
  name: {
    type: String,
    required: [true, USER_SCHEMA_REQUIRED.NAME],
    minlength: 2,
    maxlength: 30,
    validate: {
      validator: (v) => isLength(v),
      message: USER_SCHEMA_VALIDATE.NAME,
    },
  },
});

function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
}

userSchema.methods.toJSON = toJSON;

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error(NOT_AUTH_ERROR_EMAIL_PASSWORD));
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error(NOT_AUTH_ERROR_EMAIL_PASSWORD));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
