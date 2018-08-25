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

app.get('/produto/:id', (req,res) => {
  const product = products.find((item) => item.id === parseInt(req.params.id));
  if (product) {
    res.send(product);
  } else {
    res.status(404).send(`Item ${req.params.id} não encotrado`);
  }
});

app.post('/produto', (req,res) => {

  const schema = {
    'name': Joi.string().min(3).required(),
    'quant': Joi.number().min(1).integer().positive().default(1),
    'type': Joi.string().valid('Camisa', 'Calca', 'Calcado', 'Acessorio').required()
  };

  const result = Joi.validate(req.body, schema);

  if (result.error) {
    res.status(400).send(result.error.details[0].message);

    return;
  }

  products.forEach((item) => {
    if (item.name === req.body.name) {
      item.quant += req.body.quant;

      res.send(`Item ${item.name} já existe no estoque, 
      quantidade aumentada para ${item.quant}`);
    }
  });

  const product = {
    'id': products.length + 1,
    'name': req.body.name,
    'quant': req.body.quant,
    'type': req.body.type
  };

  products.push(product);
  res.send(`Produto cadastrado com sucesso: ${product.name}`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));