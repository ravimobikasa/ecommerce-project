const isAlphabet = (value, helpers) => {
  if (!value.match(/^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$/)) {
    return helpers.message('{{#label}} must be alphabets only ')
  }
  return value
}

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters')
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain atleast 1 letter and 1 number')
  }
  return value
}

const phoneNumber = (value, helpers) => {
  if (!value.match(/^\d{10}$/)) {
    return helpers.message('Please enter a valid Phone Number')
  }
  if (value.length != 10) {
    return helpers.message('Phone Number must contain atleast 10 digits')
  }
  return value
}

const priceValidate = (value, helpers) => {
  if (value <= 0) {
    return helpers.message('Price should be greater tha 0')
  }
  return value
}

const isEmail = (value, helpers) => {
  if (!value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z.]+$/)) {
    return helpers.message('Please enter valid Email Address')
  }
  return value
}
module.exports = {
  password,
  phoneNumber,
  priceValidate,
  isAlphabet,
  isEmail,
}
