const db = require('../models/index')
const { hashPassword } = require('./../utils')
const { User } = require('./../models')

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body

    const hashedPassword = await hashPassword.generateHash(password, 10)

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    })

    console.log('user', newUser)
  } catch (err) {
    console.log('error', err)
  }
}

module.exports = {
  registerUser,
}
