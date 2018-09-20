const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
{'id': Number,
 'name': String,
 'email': {
     'type': String,
     'unique': true,
     'index': true
 },
 'password': {
     'type': String,
     'select': false
 },
 'type': String},
{'versionKey': false}
);

const user = mongoose.model('User', userSchema);

module.exports = user;