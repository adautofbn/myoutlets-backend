const Joi = require('joi');

const types = [
'camisa',
'calca',
'calcado',
'acessorio'
];

function validateProduct (product, update = false) {
    let schema = null;
    if (update) {
      schema = {
        'name': Joi.string().min(3),
        'quant': Joi.number().min(1).integer(),
        'type': Joi.string().valid(types)
      };
    } else {
      schema = {
        'name': Joi.string().min(3).required(),
        'quant': Joi.number().min(1).integer(),
        'type': Joi.string().valid(types).required()
      };
    }

    return Joi.validate(product, schema);
}

function validateQuant (productQuant, newQuant) {
    let message = '';
    if (productQuant < newQuant) {
      message = 'Quantidade do produto indisponível no estoque';
    }

    return message;
}

function validateId (product) {
    const schema = {
        'id': Joi.number().integer().min(1).required(),
        'quant': Joi.number().integer().min(1)
      };
    return Joi.validate(product,schema);
}

module.exports = {
    validateId,
    validateProduct,
    validateQuant
};