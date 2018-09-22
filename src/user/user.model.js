/* eslint-disable */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{'id': Number,
 'name': {
     'type': String,
     'minlength': [3, 'Name too short']
 },
 'email': {
     'type': String,
     'unique': true,
     'match': [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
 },
 'password': {
     'type': String,
     'minlength': [6, 'Password too short'],
     'select': false
 },
 'type': {
     'type': String,
     'enum': ['cliente', 'representante']
 }},
{'versionKey': false}
);

const user = mongoose.model('User', userSchema);

module.exports = user;