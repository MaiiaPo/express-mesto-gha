const cardRoutes = require('express').Router();
const { validationCard, validationCardId } = require('../middlewares/validation');

const {
  getCards,
  createCard,
  deleteCardById,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRoutes.get('/', getCards);
cardRoutes.post('/', validationCard, createCard);
cardRoutes.delete('/:cardId', validationCardId, deleteCardById);
cardRoutes.put('/:cardId/likes', validationCardId, likeCard);
cardRoutes.delete('/:cardId/likes', validationCardId, dislikeCard);

module.exports = cardRoutes;
