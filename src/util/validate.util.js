const Joi = require('joi');

function validateProduct (product, update = false) {
    let schema = null;
    if (update) {
      schema = {
        'name': Joi.string().min(3),
        'quant': Joi.number().min(1).integer(),
        'type': Joi.string().valid('Camisa', 'Calca', 'Calcado', 'Acessorio')
      };
    } else {
      schema = {
        'name': Joi.string().min(3).required(),
        'quant': Joi.number().min(1).integer(),
        'type': Joi.string().valid('Camisa', 'Calca', 'Calcado', 'Acessorio').required()
      };
    }

    return Joi.validate(product, schema);
}

function validateQuant (productQuant, newQuant) {
    if (productQuant < newQuant) {
      return 'Quantidade do produto indisponível no estoque';
    }
    return '';
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