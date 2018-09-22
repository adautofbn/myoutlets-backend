const Joi = require('joi');

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
    validateQuant
};