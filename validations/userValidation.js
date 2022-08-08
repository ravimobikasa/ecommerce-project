const Joi = require('joi')
const { password, phoneNumber } = require('./customValidation')

const registerUser = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().required().custom(phoneNumber),
    password: Joi.string().required().custom(password),
  }),
}

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}
const addProduct = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    imageUrl: Joi.string().required(),
    price: Joi.number().required(),
    description: Joi.string().required(),
  }),
}

module.exports = {
  registerUser,
  login,
  addProduct,
}
