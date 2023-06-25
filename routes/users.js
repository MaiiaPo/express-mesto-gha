const userRoutes = require('express').Router();

const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
} = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.get('/:userId', getUserById);
userRoutes.patch('/me', updateUser);
userRoutes.patch('/me/avatar', updateUserAvatar);

module.exports = userRoutes;
