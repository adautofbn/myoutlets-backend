/* eslint-disable */

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
{'id': Number,
 'name': {
     'type': String,
     'minlength': [3, 'Nome muito curto, precisa ter mais de 3 caracteres'],
     'required': true
 },
 'email': {
     'type': String,
     'unique': true,
     'match': [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Insira um endereço de email válido'],
     'required': true
 },
 'password': {
     'type': String,
     'minlength': [6, 'Senha curta, necessário 6 ou mais caracteres'],
     'required': true
 },
 'role': {
     'type': String,
     'enum': ['cliente', 'representante'],
     'required': true
 }},
{'versionKey': false}
);

const user = mongoose.model('User', UserSchema);

module.exports = user;

