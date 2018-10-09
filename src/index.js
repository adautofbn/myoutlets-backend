/* eslint-disable no-unused-expressions */

const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const app = express();
const HALF_HOUR = 1800000;

mongoose.Promise = Promise;
mongoose.connect('mongodb://127.0.0.1/modb', {'useNewUrlParser': true});

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': false}));

const store = new MongoStore({
  'uri': 'mongodb://127.0.0.1/modb',
  'collection': 'session'
});

store.on('connected', () => {
  store.client;
});

store.on('error', (error) => {
  if (error) {
    console.log(error);
  }
});

require('./auth/passport')(passport);
app.use(session({'secret': 'my_outlet_secret',
  store,
  'cookie': {'maxAge': HALF_HOUR},
  'resave': false,
  'saveUninitialized': false}));
app.use(passport.initialize());
app.use(passport.session());

const productRoute = require('./product/product.route');
const bagRoute = require('./bag/bag.route');
const userRoute = require('./user/user.route');
const swaggerRoute = require('./docs/docs.route');
const authRoute = require('./auth/auth.route');

app.use('/produto', productRoute);
app.use('/bolsa', bagRoute);
app.use('/usuario', userRoute);
app.use('/docs', swaggerRoute);
app.use('/login', authRoute);

app.get('/', (req,res) => {
  res.json('Welcome to MyOutlet`s');
});

const nodeEnv = process.env.NODE_ENV || 'development';

let corsOptions = {};

if (nodeEnv === 'production') {
  corsOptions = {
    'origin': 'http://localhost:3000',
    'optionsSuccessStatus': 200
  };
  console.log('The system is running in production');
} else {
  console.log('The system is not running in production');
}

app.use(cors(corsOptions));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;