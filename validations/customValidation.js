const password = (value, helpers) => {
  console.log('value1', value.length)
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters')
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number')
  }
  return value
}

const phoneNumber = (value, helpers) => {
  if (value.length != 10) {
    console.log('value', value.length)
    return helpers.message('Phone Number must be at least 10 digits')
  }
  return value
}

module.exports = {
  password,
  phoneNumber,
}
