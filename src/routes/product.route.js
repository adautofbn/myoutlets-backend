const express = require('express');
const router = new express.Router();

const productUtil = require('../util/product.util');
const validUtil = require('../util/validate.util.js');

const products = require('../data/products.json');

router.use((req,res,next) => {
    next();
});

function getProducts () {
    return products;
}

router.get('/', (req,res) => {
    res.send(products);
});

router.get('/:id', (req,res) => {
    const product = productUtil.findProduct(getProducts(),req.params.id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send(`Item ${req.params.id} não encontrado`);
    }
});

router.post('/', (req,res) => {

    let message = '';

    const {error} = validUtil.validateProduct(req.body);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    products.forEach((item) => {
      if (item.name.toLowerCase() === req.body.name.toLowerCase()) {
        item.quant += req.body.quant || 1;

        message = `Item ${item.name} já existe no estoque, 
        quantidade aumentada para ${item.quant}`;
      }
    });

    if (!message) {
      const product = {
        'id': products.length + 1,
        'name': req.body.name,
        'quant': req.body.quant || 1,
        'type': req.body.type
      };

      products.push(product);
      message = `Produto cadastrado com sucesso: ${product.name}`;
    }

    return res.status(200).send(message);
});

router.put('/:id', (req,res) => {
    const product = productUtil.findProduct(products,req.params.id);
    if (!product) {
      return res.status(404).send(`Item ${req.params.id} não encontrado`);
    }

    const {error} = validUtil.validateProduct(req.body, true);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    product.name = req.body.name || product.name;
    product.quant = req.body.quant || product.quant;
    product.type = req.body.type || product.type;

    return res.status(200).send(`Produto atualizado com sucesso: ${product.name}`);
});

router.delete('/:id', (req,res) => {

    const product = productUtil.findProduct(products,req.params.id);
    if (!product) {
      return res.status(404).send(`Item ${req.params.id} não encontrado`);
    }

    const index = products.indexOf(product);
    products.splice(index,1);

    return res.status(200).send(`Item deletado com sucesso ${product.name}`);
});

module.exports = router;