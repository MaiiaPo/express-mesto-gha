const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.send(card);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCardById = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then(() => res.send(cardId))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.likeCard = (req, res) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        console.log('Карточка не найдена');
        return;
      }
      res.send(card);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.dislikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (!card) {
        console.log('Карточка не найдена');
        return;
      }
      res.send(card);
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
