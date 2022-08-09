const Joi = require('joi')
const { priceValidate } = require('./customValidation')

const addProduct = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    price: Joi.number().required().custom(priceValidate),
    description: Joi.string().required(),
  }),
}

const getProduct = {
  body: Joi.object().keys({
    // id: Joi.number().required(),
  }),
}

const updateProduct = {
  body: Joi.object().keys({
    id: Joi.number().required(),
    title: Joi.string(),
    price: Joi.number().custom(priceValidate),
    description: Joi.string(),
  }),
}

const deleteProduct = {
  body: Joi.object().keys({
    id: Joi.number().required(),
  }),
}

module.exports = {
  addProduct,
  getProduct,
  updateProduct,
  deleteProduct,
}
