const mongoose = require('mongoose');
const productSchema = require('../product/product.model');

const bagSchema = new mongoose.Schema({
    'products': [productSchema]
});

const bag = mongoose.model('Bag', bagSchema);

module.exports = bag;