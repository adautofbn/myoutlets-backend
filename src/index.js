const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1/modb', {'useNewUrlParser': true});

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': false}));

const productRoute = require('./product/product.route.js');
const bagRoute = require('./bag/bag.route');
const userRoute = require('./user/user.route');
const swaggerRoute = require('./docs/docs.route.js');

app.use('/produto', productRoute);
app.use('/bolsa', bagRoute);
app.use('/usuario', userRoute);
app.use('/docs', swaggerRoute);

app.get('/', (req,res) => {
  res.json('Welcome to MyOutlet`s');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;