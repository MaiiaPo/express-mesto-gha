/* eslint-disable import/no-unresolved */
const Card = require('../models/card');

const INCORRECT_DATA = 400;
const NOT_FOUND = 404;
const ERROR = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => res.status(ERROR).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch(() => res.status(ERROR).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new Error(`Карточка с id: ${cardId} не найдена`);
      }
      Card.findByIdAndRemove(cardId).then(() => res.send({ message: `Карточка с id: ${cardId} успешно удалена` }));
    })
    .catch(() => {
      res.status(INCORRECT_DATA).send({ message: `Передан некорректный id: ${cardId}` });
      res.status(NOT_FOUND).send({ message: `Карточка с id: ${cardId} не найдена` });
      res.status(ERROR).send({ message: `Произошла ошибка на сервере` });
    });
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new Error(`Карточка с id: ${cardId} не найдена`);
      }
      res.send(card);
    })
    .catch(() => {
      res.status(INCORRECT_DATA).send({ message: `Передан некорректный id: ${cardId}` });
      res.status(NOT_FOUND).send({ message: `Карточка с id: ${cardId} не найдена` });
      res.status(ERROR).send({ message: `Произошла ошибка на сервере` });
    });
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        throw new Error(`Карточка с id: ${cardId} не найдена`);
      }
      res.send(card);
    })
    .catch(() => {
      res.status(INCORRECT_DATA).send({ message: `Передан некорректный id: ${cardId}` });
      res.status(NOT_FOUND).send({ message: `Карточка с id: ${cardId} не найдена` });
      res.status(ERROR).send({ message: `Произошла ошибка на сервере` });
    });
};
