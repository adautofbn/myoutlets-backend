const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    'id': {
        'type': String,
        'required': true
    },
    'name': {
        'type': String,
        'minlength': 3,
        'required': true
    },
    'email': {
        'type': String,
        'required': true
    },
    'password': {
        'type': String,
        'minlength': 6,
        'required': true
    },
    'type': {
        'type': String,
        'enum': [
            'representante',
            'cliente'
        ],
        'required': true
    }
});

const user = mongoose.model('User', userSchema);

module.exports = user;