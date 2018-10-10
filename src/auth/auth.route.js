/* eslint-disable consistent-return */

const express = require('express');
const router = new express.Router();

const controller = require('./auth.controller');
const auth = require('./auth.service');

router.post('/', controller.login);

router.delete('/', auth.ensureAuthenticated, controller.logout);

router.get('/check', controller.check);

module.exports = router;