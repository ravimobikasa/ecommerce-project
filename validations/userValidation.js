const Joi = require('joi')
const { password, phoneNumber, isAlphabet } = require('./customValidation')

const registerUser = {
  body: Joi.object().keys({
    firstName: Joi.string().required().custom(isAlphabet),
    lastName: Joi.string().required().custom(isAlphabet),
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

module.exports = {
  registerUser,
  login,
}
