const cardRoutes = require('express').Router();

const {
  getCards,
  createCard,
  deleteCardById,
} = require('../controllers/cards');

cardRoutes.get('/', getCards);
cardRoutes.post('/', createCard);
cardRoutes.delete('/:cardId', deleteCardById);

module.exports = cardRoutes;
