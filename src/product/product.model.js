const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
{'id': Number,
 'name': {
     'type': String,
     'unique': true,
     'minlength': [3, 'Nome muito curto, precisa ter mais de 3 caracteres'],
     'required': true
 },
 'quant': {
     'type': Number,
     'min': [1, 'Quantidade mínima de produtos é 1'],
     'default': 1,
     'required': true
 },
 'type': {
     'type': String,
     'enum': ['camisa', 'calca', 'calcado', 'acessorio', 'short', 'saia', 'bermuda'],
     'required': true
 },
 'price': {
     'type': Number,
     'default': 0,
     'required': true
 },
 'img': String,
 'description': {
     'type': String,
     'required': true
 },
 'owner': {
     'type': Number ,
     'required': true
 }},
{'versionKey': false}
);

const product = mongoose.model('Product', productSchema);

module.exports = product;