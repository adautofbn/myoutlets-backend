const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('static'));

const productRoute = require('./routes/product.route.js');
const bagRoute = require('./routes/bag.route');
const swaggerRoute = require('./routes/docs.route.js');

app.use('/produto', productRoute);
app.use('/bolsa', bagRoute);
app.use('/docs', swaggerRoute);

app.get('/', (req,res) => {
  res.json('Welcome to MyOutlet`s');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;