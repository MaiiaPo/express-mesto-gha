const express = require('express');
const router = require('express').Router();

const usersRouter = require('./users');

router.use('/users', usersRouter);
router.use(express.json());

module.exports = router;
