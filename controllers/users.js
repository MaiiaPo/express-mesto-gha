/* eslint-disable import/no-extraneous-dependencies */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const {
  INCORRECT_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: `Пользователь с id: ${userId} не найден` });
      }
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: '345 Переданы некорректные данные' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      const {
        // eslint-disable-next-line no-shadow
        email, name, about, avatar,
      } = user;
      return res.status(201).send({
        email, name, about, avatar,
      });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      }
      res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: `Пользователь с id: ${userId} не найден` });
      }
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: `Пользователь с id: ${userId} не найден` });
      }
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      return res.send({ token });
    })
    .catch((error) => res.status(401).send({ message: error.message }));
};

module.exports.getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};
