const express = require('express');
const router = new express.Router();
const cache = require('memory-cache');

const productUtil = require('../product/product.util');
const validUtil = require('../util/validate.util');

const bag = require('./bag.json');

cache.put('bag', bag);

router.use((req,res,next) => {
    next();
});

router.get('/', (req, res) => {
    if (bag.length === 0) {
      res.json('Sua bolsa está vazia');
    } else {
      res.json(cache.get('bag'));
    }
});

router.post('/', (req,res) => {
    let message = '';

    const {error} = validUtil.validateId(req.body);

    if (error) {
      return res.status(400).json(error.details[0].message);
    }

    const product = productUtil.findProduct(cache.get('products'),req.body.id);
    if (!product) {
      message = `Item ${req.body.id} não encontrado`;
      return res.status(404).json(message);
    }

    message = validUtil.validateQuant(product.quant, req.body.quant);
    if (!message) {
      product.quant = req.body.quant || 1;
    }

    bag.forEach((item) => {
      if (item.id === product.id) {
        const newQuant = item.quant + (product.quant || 1);

        message = validUtil.validateQuant(product.quant, newQuant);
        if (!message) {
          item.quant = newQuant;

          message = `Item ${item.name} já existe na bolsa, quantidade aumentada para ${item.quant}`;
        }
      }
    });

    if (!message) {
      bag.push(product);
      message = `Item ${product.name} adicionado à sua bolsa`;
    }

    cache.put('bag',bag);
    return res.status(200).json(message);
});

router.delete('/', (req,res) => {

  const product = productUtil.findProduct(bag,req.query.id);
  if (!product) {
    return res.status(404).json(`Item ${req.query.id} não encontrado`);
  }

  const index = bag.indexOf(product);
  bag.splice(index,1);

  cache.put('bag', bag);
  return res.status(200).json(`Item deletado da sua bolsa com sucesso ${product.name}`);
});

module.exports = router;