const { hashPassword } = require('./../utils')
const { User } = require('./../models')



const registerUser = async (req, res) => {
  try {
    if (req.errors) {
      return res.render('register', { errorMessage: req.errors })
    }
    const { firstName, lastName, email, phoneNumber, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (user) {
      return res.render('register', { errorMessage: 'Email already exist' })
    }

    const result = await User.findOne({ where: { phoneNumber } })

    if (result) {
      return res.render('register', { errorMessage: 'Phone Number already exist' })
    }

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

    // session will go here

<<<<<<< HEAD
    // After login user redirect to shop page
    res.redirect('/user/test')
=======
    req.session.user = {
      id: user.id,
    }
    // After login user redirect to shop page
    res.send('Your Are now logged in')
>>>>>>> b1869c75ccfa68a5f7187d36baa932a16a7abf05
  } catch (err) {
    // will be shown on error page
    console.log('error', err)
  }
}

const logOut = (req, res) => {
  req.session.destroy()
  res.send('You are logout')
}

module.exports = {
  registerUser,
  login,
  logOut,
}
