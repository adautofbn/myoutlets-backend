const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
{'id': Number,
 'name': {
     'type': String,
     'unique': true,
     'minlength': [3, 'Name too short'],
     'required': true
 },
 'quant': {
     'type': Number,
     'min': [1, 'Minimum quantity is 1'],
     'default': 1,
     'required': true
 },
 'type': {
     'type': String,
     'enum': ['camisa', 'calca', 'calcado', 'acessorio', 'short', 'saia', 'bermuda'],
     'required': true
 }},
{'versionKey': false}
);

const product = mongoose.model('Product', productSchema);

module.exports = product;