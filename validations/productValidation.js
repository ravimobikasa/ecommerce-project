const Joi = require('joi')

const addProduct = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
  }),
}

module.exports = {
  addProduct,
}
