const express = require('express');
const router = new express.Router();
const controller = require('./bag.controller');

router.get('/', controller.getBag);

router.post('/', controller.addProduct);

router.delete('/', controller.removeProduct);

module.exports = router;