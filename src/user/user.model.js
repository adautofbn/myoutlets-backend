const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    'id': Number,
    'name': String,
    'email': String,
    'password': String,
    'type': String
});

const user = mongoose.model('User', userSchema);

module.exports = user;