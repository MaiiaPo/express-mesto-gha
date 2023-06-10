const express = require('express');
const router = require('express').Router();

const userRouter = require('./users');
const cardRouter = require('./cards');

router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use(express.json());

module.exports = router;
