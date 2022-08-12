const { custom } = require('joi')
const Joi = require('joi')
const { password, phoneNumber, isAlphabet, isEmail } = require('./customValidation')

const registerUser = {
  body: Joi.object().keys({
    firstName: Joi.string().required().custom(isAlphabet),
    lastName: Joi.string().required().custom(isAlphabet),
    email: Joi.string().required().email().custom(isEmail),
    phoneNumber: Joi.string().required().custom(phoneNumber),
    password: Joi.string().required().custom(password),
  }),
}

const login = {
  body: Joi.object().keys({
    email: Joi.string().required().email().custom(isEmail),
    password: Joi.string().required(),
  }),
}

module.exports = {
  registerUser,
  login,
}
