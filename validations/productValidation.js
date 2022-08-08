const Joi = require('joi')
const { priceValidate } = require('./customValidation')
const addProduct = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    price: Joi.number().required().custom(priceValidate),
    description: Joi.string().required(),
  }),
}

module.exports = {
  addProduct,
}
