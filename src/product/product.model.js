const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
{'id': Number,
 'name': String,
 'quant': Number,
 'type': String},
{'versionKey': false}
);

const product = mongoose.model('Product', productSchema);

module.exports = product;