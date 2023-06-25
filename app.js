/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = require('./routes');
const {
  login,
  createUser,
} = require('./controllers/users');
const auth = require('./middlewares/auth');
const errors = require('./middlewares/errors');

const { NOT_FOUND_ERROR_CODE } = require('./utils/constants');

mongoose.connect('mongodb://localhost:27017/mestodb');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);
router.use(express.json());
app.use(router);

app.use((req, res) => {
  res.status(NOT_FOUND_ERROR_CODE).send({ message: 'Несуществующая страница' });
});

app.use(errors);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
