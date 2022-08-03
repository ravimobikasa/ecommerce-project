const Joi = require('joi')

const registerUser = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    phoneNumber: Joi.string().required(),
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
