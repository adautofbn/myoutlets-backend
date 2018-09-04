const express = require('express');
const router = new express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../config/swagger.js');

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;