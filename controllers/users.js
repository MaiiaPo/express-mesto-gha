/* eslint-disable import/no-unresolved */
const User = require('../models/user');

const SUCCESS = 200;
const INCORRECT_DATA = 400;
const NOT_FOUND = 404;
const ERROR = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(SUCCESS).send(users);
    })
    .catch(() => res.status(ERROR).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.getUserById = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail(() => { throw new Error(`Пользователь с id: ${userId} не найден`); })
    .then((user) => {
      if (!user) {
        throw new Error(`Пользователь c id: ${userId} не найден`);
      }
      res.send(user);
    })
    .catch(() => {
      res.status(INCORRECT_DATA).send({ message: `Передан некорректный id: ${userId}` });
      res.status(NOT_FOUND).send({ message: `Пользователь с id: ${userId} не найден` });
      res.status(ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch(() => {
      res.status(INCORRECT_DATA).send({ message: 'Переданы некорректные данные' });
      res.status(ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, about }, { new: true })
    .then((user) => {
      if (!user) {
        throw new Error(`Пользователь c id: ${userId} не найден`);
      }
      res.send(user);
    })
    .catch(() => {
      res.status(INCORRECT_DATA).send({ message: `Передан некорректный id: ${userId}` });
      res.status(NOT_FOUND).send({ message: `Пользователь с id: ${userId} не найден` });
      res.status(ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { avatar }, { new: true })
    .then((user) => {
      if (!user) {
        throw new Error(`Пользователь c id: ${userId} не найден`);
      }
      res.send(user);
    })
    .catch(() => {
      res.status(INCORRECT_DATA).send({ message: `Передан некорректный id: ${userId}` });
      res.status(NOT_FOUND).send({ message: `Пользователь с id: ${userId} не найден` });
      res.status(ERROR).send({ message: 'Произошла ошибка на сервере' });
    });
};
