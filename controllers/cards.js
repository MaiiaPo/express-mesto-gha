/* eslint-disable import/no-unresolved */
const Card = require('../models/card');
const {
  INCORRECT_DATA_ERROR_CODE,
  NOT_FOUND_ERROR_CODE,
  DEFAULT_ERROR_CODE,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch(() => res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .orFail(new Error('NotValidId'))
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: `Карточка с id: ${cardId} не найдена` });
      }
      return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: `Карточка с id: ${cardId} не найдена` });
    });
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: `Карточка с id: ${cardId} не найдена` });
      }
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(new Error('NotValidId'))
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        return res.status(NOT_FOUND_ERROR_CODE).send({ message: `Карточка с id: ${cardId} не найдена` });
      }
      if (error.name === 'ValidationError' || error.name === 'CastError') {
        return res.status(INCORRECT_DATA_ERROR_CODE).send({ message: 'Переданы некорректные данные' });
      }
      return res.status(DEFAULT_ERROR_CODE).send({ message: 'Произошла ошибка на сервере' });
    });
};
