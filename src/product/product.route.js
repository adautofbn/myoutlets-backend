const express = require('express');
const router = new express.Router();
const cache = require('memory-cache');

const productUtil = require('./product.util');
const validUtil = require('../util/validate.util');

const products = require('./products.json');

cache.put('products', products);

router.use((req,res,next) => {
    next();
});

router.get('/', (req,res) => {
  let filteredProducts = cache.get('products');
  if (req.query.type) {
    filteredProducts = cache.get('products').filter((product) => product.type === req.query.type.toLowerCase());
  }
  res.json(filteredProducts);
});

router.get('/:id', (req,res) => {
    const product = productUtil.findProduct(cache.get('products'),req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json(`Item ${req.params.id} não encontrado`);
    }
});

router.post('/', (req,res) => {

    let message = '';

    const {error} = validUtil.validateProduct(req.body);

    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    products.forEach((item) => {
      if (item.name === req.body.name.toLowerCase()) {
        item.quant += req.body.quant || 1;

        message = `Item ${item.name} já existe no estoque, quantidade aumentada para ${item.quant}`;
      }
    });

    if (!message) {
      const product = {
        'id': products.length + 1,
        'name': req.body.name.toLowerCase(),
        'quant': req.body.quant || 1,
        'type': req.body.type.toLowerCase()
      };

      products.push(product);
      message = `Produto cadastrado com sucesso: ${product.name}`;
    }

    cache.put('products', products);
    return res.status(200).json(message);
});

router.put('/:id', (req,res) => {
    const product = productUtil.findProduct(cache.get('products'),req.params.id);
    if (!product) {
      return res.status(404).json(`Item ${req.params.id} não encontrado`);
    }

    const {error} = validUtil.validateProduct(req.body, true);

    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    product.name = req.body.name || product.name;
    product.quant = req.body.quant || product.quant;
    product.type = req.body.type || product.type;

    cache.put('products', products);

    return res.status(200).json(`Produto atualizado com sucesso: ${product.name}`);
});

router.delete('/:id', (req,res) => {

    const product = productUtil.findProduct(cache.get('products'),req.params.id);
    if (!product) {
      return res.status(404).json(`Item ${req.params.id} não encontrado`);
    }

    const index = products.indexOf(product);
    products.splice(index,1);

    cache.put('products', products);

    return res.status(200).json(`Item deletado com sucesso: ${product.name}`);
});

module.exports = router;