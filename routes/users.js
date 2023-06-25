const userRoutes = require('express').Router();
// eslint-disable-next-line import/no-extraneous-dependencies
const { celebrate, Joi } = require('celebrate');

const regURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.get('/me', getCurrentUser);
userRoutes.get('/:userId', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
}), getUserById);
userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUser);
userRoutes.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(regURL),
  }),
}), updateUserAvatar);

module.exports = userRoutes;
