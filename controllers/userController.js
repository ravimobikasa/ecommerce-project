const { hashPassword } = require('./../utils')
const { User } = require('./../models')

const registerUser = async (req, res) => {
  try {
    if (req.errors) {
      return res.render('register', { errorMessage: req.errors })
    }
    const { firstName, lastName, email, phoneNumber, password } = req.body

    const hashedPassword = await hashPassword.generateHash(password, 10)

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    })

    res.redirect('/user/login')
  } catch (err) {
    // will be shown on error page
    console.log('error', err)
  }
}

const login = async (req, res) => {
  try {
    if (req.errors) {
      return res.render('login', { errorMessage: req.errors })
    }

    const { email, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (!user || !(await hashPassword.comparePassword(password, user.password))) {
      return res.render('login', { errorMessage: 'Please enter correct email or password' })
    }

    // seesion will go here

    // After login user redirect to shop page
    res.redirect('/user/test')
  } catch (err) {
    // will be shown on error page
    console.log('error', err)
  }
}

module.exports = {
  registerUser,
  login,
}
