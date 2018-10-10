/* eslint-disable no-sync */

const express = require('express');
const router = new express.Router();

const controller = require('./user.controller');
const auth = require('../auth/auth.service');

router.get('/', controller.getAllUsers);

router.get('/:id', auth.ensureAuthenticated, auth.authenticateById, controller.getUserById);

router.post('/', controller.createUser);

router.put('/:id', auth.ensureAuthenticated, auth.authenticateById, controller.updateUser);

router.delete('/:id', auth.ensureAuthenticated, auth.authenticateById, controller.deleteUser);

module.exports = router;