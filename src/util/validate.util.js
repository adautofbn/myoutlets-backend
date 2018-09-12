const Joi = require('joi');

const productTypes = [
'camisa',
'calca',
'calcado',
'acessorio'
];

const userTypes = [
  'representante',
  'cliente'
];

function validateProduct (product, update = false) {
    let schema = null;
    if (update) {
      schema = {
        'name': Joi.string().min(3),
        'quant': Joi.number().min(1).integer(),
        'type': Joi.string().valid(productTypes)
      };
    } else {
      schema = {
        'name': Joi.string().min(3).required(),
        'quant': Joi.number().min(1).integer(),
        'type': Joi.string().valid(productTypes).required()
      };
    }

    return Joi.validate(product, schema);
}

function validateUser (user, update = false) {
  let schema = null;
  if (update) {
    schema = {
      'name': Joi.string().min(3),
      'email': Joi.string().email(),
      'password': Joi.string().min(6),
      'type': Joi.string().valid(userTypes)
    };
  } else {
    schema = {
      'name': Joi.string().min(3).required(),
      'email': Joi.string().email({'minDomainAtoms': 2}).required(),
      'password': Joi.string().min(6).required(),
      'type': Joi.string().valid(userTypes).required()
    };
  }
  return Joi.validate(user,schema);
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
    validateQuant,
    validateUser
};