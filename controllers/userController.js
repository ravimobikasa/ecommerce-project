<<<<<<< HEAD
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
=======
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
    res.redirect('/user/test')
  } catch (err) {
    console.log('error', err)
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user) {
      return res.render('login', { errorMessage: 'Invalid Username or Password' })
    }
    res.redirect('/user/test')
  } catch (err) {
    console.log('error', err)
  }
}

module.exports = {
  registerUser,
  login,
}
>>>>>>> b496be9f4ebbc1171d60c9341ad2e87aa0957a8d
