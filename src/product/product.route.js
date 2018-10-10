const express = require('express');
const router = new express.Router();

const controller = require('./product.controller');
const auth = require('../auth/auth.service');

router.get('/', controller.getAllProducts);

router.get('/:id', auth.ensureAuthenticated, controller.getProductById);

router.post('/', auth.ensureAuthenticated, auth.authenticateByRole, controller.createProduct);

router.put('/:id', auth.ensureAuthenticated, auth.authenticateByRole, auth.authenticateByOwnership, controller.updateProduct);

router.delete('/:id', auth.ensureAuthenticated, auth.authenticateByRole, auth.authenticateByOwnership, controller.deleteProduct);

module.exports = router;