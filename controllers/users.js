/* eslint-disable import/no-unresolved */
const User = require('../models/user');

const INCORRECT_DATA = 400;
const NOT_FOUND = 404;
const ERROR = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(ERROR).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: `Пользователь с id: ${userId} не найден` });
      }
      return res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
      }
      if (error.name === 'CastError') {
        return res.status(NOT_FOUND).send({ message: `Пользователь с id: ${userId} не найден` });
      }
      return res.status(ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
      }
      res.status(ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: `Пользователь с id: ${userId} не найден` });
      }
      return res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
      }
      if (error.name === 'CastError') {
        return res.status(NOT_FOUND).send({ message: `Пользователь с id: ${userId} не найден` });
      }
      return res.status(ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND).send({ message: `Пользователь с id: ${userId} не найден` });
      }
      return res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
      }
      if (error.name === 'CastError') {
        return res.status(NOT_FOUND).send({ message: `Пользователь с id: ${userId} не найден` });
      }
      return res.status(ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};
