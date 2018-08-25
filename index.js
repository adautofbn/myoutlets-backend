const Joi = require('joi');

const express = require('express');
const app = express();
app.use(express.json());

const products = [
  {'id': 1,
'name': 'camisa1',
'quant': 1,
'type': 'Camisa'},
  {'id': 2,
'name': 'camisa2',
'quant': 1,
'type': 'Camisa'},
  {'id': 3,
'name': 'calca1',
'quant': 1,
'type': 'Calca'},
  {'id': 4,
'name': 'sapato1',
'quant': 1,
'type': 'Calcado'},
  {'id': 5,
'name': 'cinto1',
'quant': 1,
'type': 'Acessorio'}
];

app.get('/', (req,res) => {
  res.send('MyOutlets!');
});

app.get('/produto', (req, res) => {
  res.send(products);
});

function findProduct (id) {
  const product = products.find((item) => item.id === parseInt(id));
  return product;
}

function validateProduct (product, update = false) {
  let schema = null;
  if (update) {
    schema = {
      'name': Joi.string().min(3),
      'quant': Joi.number().greater(1).integer(),
      'type': Joi.string().valid('Camisa', 'Calca', 'Calcado', 'Acessorio')
    };
  } else {
    schema = {
      'name': Joi.string().min(3).required(),
      'quant': Joi.number().greater(1).integer(),
      'type': Joi.string().valid('Camisa', 'Calca', 'Calcado', 'Acessorio').required()
    };
  }

  return Joi.validate(product, schema);
}

app.get('/produto/:id', (req,res) => {
  const product = findProduct(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send(`Item ${req.params.id} não encontrado`);
  }
});

app.post('/produto', (req,res) => {

  let message = '';

  const {error} = validateProduct(req.body);

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

  return res.send(message);
});

app.put('/produto/:id', (req,res) => {
  const product = findProduct(req.params.id);
  if (!product) {
    return res.status(404).send(`Item ${req.params.id} não encontrado`);
  }

  const {error} = validateProduct(req.body, true);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  product.name = req.body.name || product.name;
  product.quant = req.body.quant || product.quant;
  product.type = req.body.type || product.type;

  return res.send(`Produto atualizado com sucesso: ${product.name}`);
});

app.delete('/produto/:id', (req,res) => {

  const product = findProduct(req.params.id);
  if (!product) {
    return res.status(404).send(`Item ${req.params.id} não encontrado`);
  }

  const index = products.indexOf(product);
  products.splice(index,1);

  return res.send(`Item deletado com sucesso ${product.name}`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));