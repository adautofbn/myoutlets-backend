/* eslint-disable */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{'id': Number,
 'name': {
     'type': String,
     'minlength': [3, 'Name too short'],
     'required': true
 },
 'email': {
     'type': String,
     'unique': true,
     'match': [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
     'required': true
 },
 'password': {
     'type': String,
     'minlength': [6, 'Password too short'],
     'select': false,
     'required': true
 },
 'type': {
     'type': String,
     'enum': ['cliente', 'representante'],
     'required': true
 }},
{'versionKey': false}
);

const user = mongoose.model('User', userSchema);

module.exports = user;