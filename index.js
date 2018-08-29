const Joi = require('joi');
const morgan = require('morgan');
const express = require('express');
const app = express();
app.use(express.json());
app.use(morgan('tiny'));

app.use(express.static('static'));

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

const bag = [];

function findProduct (id) {
  const product = products.find((item) => item.id === parseInt(id));
  return product;
}

function validateProduct (product, update = false) {
  let schema = null;
  if (update) {
    schema = {
      'name': Joi.string().min(3),
      'quant': Joi.number().min(1).integer(),
      'type': Joi.string().valid('Camisa', 'Calca', 'Calcado', 'Acessorio')
    };
  } else {
    schema = {
      'name': Joi.string().min(3).required(),
      'quant': Joi.number().min(1).integer(),
      'type': Joi.string().valid('Camisa', 'Calca', 'Calcado', 'Acessorio').required()
    };
  }

  return Joi.validate(product, schema);
}

function validateQuant (productQuant, newQuant) {
  if (productQuant < newQuant) {
    return 'Quantidade do produto indisponível no estoque';
  }
  return '';
}

app.get((req,res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.get('/', (req,res) => {
  res.send('MyOutlet`s!');
});

app.get('/produto', (req, res) => {
  res.send(products);
});

app.get('/sacola', (req, res) => {
  if (bag.length === 0) {
    res.send('Sua sacola está vazia');
  } else {
    res.send(bag);
  }
});

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

app.post('/sacola', (req,res) => {
  let message = '';
  const schema = {
    'id': Joi.number().integer().min(1).required(),
    'quant': Joi.number().integer().min(1)
  };
  const result = Joi.validate(req.body,schema);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  const product = findProduct(req.body.id);
  if (!product) {
    message = `Item ${req.body.id} não encontrado`;
    return res.status(404).send(message);
  }

  message = validateQuant(product.quant, req.body.quant);
  if (!message) {
    product.quant = req.body.quant || 1;
  }

  bag.forEach((item) => {
    if (item.id === product.id) {
      const newQuant = item.quant + (product.quant || 1);

      message = validateQuant(product.quant, newQuant);
      if (!message) {
        item.quant = newQuant;

        message = `Item ${item.name} já existe na sacola,
        quantidade aumentada para ${item.quant}`;
      }
    }
  });

  if (!message) {
    bag.push(product);

    message = `Item ${product.name} adicionado à sua sacola`;
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