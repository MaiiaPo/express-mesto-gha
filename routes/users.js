const userRoutes = require('express').Router();
const { validationUser, validationUserId, validationAvatar } = require('../middlewares/validation');

const {
  getUsers,
  getUserById,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.get('/me', getCurrentUser);
userRoutes.get('/:userId', validationUserId, getUserById);
userRoutes.patch('/me', validationUser, updateUser);
userRoutes.patch('/me/avatar', validationAvatar, updateUserAvatar);

module.exports = userRoutes;
