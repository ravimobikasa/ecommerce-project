const Joi = require('joi')

const validate = (validateSchema) => {
  const schema = validateSchema.body

  return (req, res, next) => {
    const Validation = schema.validate(req.body)
    if (Validation.error) {
      req.errors = Validation.error.details[0].message
    }
    next()
  }
}

module.exports = validate
