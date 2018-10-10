const express = require('express');
const router = new express.Router();

const auth = require('../auth/auth.service');
const controller = require('./bag.controller');

router.get('/', auth.ensureAuthenticated, controller.getBag);

router.post('/', auth.ensureAuthenticated, controller.addProduct);

router.delete('/', auth.ensureAuthenticated, controller.removeProduct);

module.exports = router;