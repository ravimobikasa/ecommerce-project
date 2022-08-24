const { User, ResetToken } = require('./../models')
const TimeUtil = require('./../utils/modifyTime')
const crypto = require('crypto')
const { sendResetPasswordMail } = require('./../utils/sendEmail')
const { hashPassword } = require('../utils')

const registerUser = async (req, res) => {
  try {
    if (req.errors) {
      return res.render('register', { formData: req.body, errorMessage: req.errors })
    }
    const { firstName, lastName, email, phoneNumber, password } = req.body

    const user = await User.findOne({ where: { email } })

    if (user) {
      return res.render('register', { formData: req.body, errorMessage: 'Email already exist' })
    }

    const result = await User.findOne({ where: { phoneNumber } })

    if (result) {
      return res.render('register', { formData: req.body, errorMessage: 'Phone Number already exist' })
    }

    const hashedPassword = await hashPassword.generateHash(password, 10)

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phoneNumber,
      password: hashedPassword,
    })

    res.redirect('/login')
  } catch (err) {
    res.render('500error')
  }
}

const login = async (req, res) => {
  try {
    if (req.errors) {
      return res.render('login', { formData: req.body, errorMessage: req.errors })
    }

    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user || !(await hashPassword.comparePassword(password, user.password))) {
      return res.render('login', { formData: req.body, errorMessage: 'Please enter correct email or password' })
    }

    // session will go here

    req.session.user = {
      id: user.id,
    }

    // After login user redirect to shop page
    res.redirect('/product')
  } catch (err) {
    res.render('500error')
  }
}

const logOut = async (req, res) => {
  await req.session.destroy()
  res.redirect('/login')
}

const loginPage = (req, res) => {
  res.render('login')
}

const registerPage = (req, res) => {
  res.render('register')
}

const home = (req, res) => {
  res.redirect('/product')
}

const forgotPasswordPage = (req, res) => {
  res.render('forgotPassword')
}

const forgotPassword = async (req, res) => {

  const FORGOT_PASSWORD_TIME_LIMIT = 10 //duration in minutes

  const { email } = req.body

  try {

    console.log('S1');
    const user = await User.findOne({ where: { email } })
 console.log('S2')
    if (!user) {
      // For security purpose sending this message
      return res.render('forgotPassword', { message: 'Reset password link has been sent to your mail.' })
    }

    const userId = user.id

    const expiresAt = TimeUtil.currentDate(FORGOT_PASSWORD_TIME_LIMIT)

    const token = crypto.randomUUID()

    let resetToken = await ResetToken.findOne({ where: { userId } })

    if (resetToken) {
      await resetToken.update({ token, expiresAt })
    } else {
      await ResetToken.create({
        userId,
        expiresAt,
        token,
      })
    }

    const resetPasswordLink = `${req.protocol}://${req.get('host')}/resetPassword/${token}`

    await sendResetPasswordMail(user.email, resetPasswordLink)

    res.render('forgotPassword', { message: 'Reset password link has been sent to your mail.' })
  } catch (err) {
    console.log(err)
    res.render('500error')
  }
}

const resetPasswordPage = async (req, res) => {
  const { token } = req.params

  if (!token) {
    return res.send('Invalid link')
  }

  const resetToken = await ResetToken.findOne({ where: { token } })

  if (!resetToken || resetToken.expiresAt.getTime() < new Date().getTime()) {
    return res.send('This link has been expired.')
  }

  res.render('resetPassword', { token: resetToken.token })
}

const resetPassword = async (req, res) => {
  const { token } = req.params
  const { password } = req.body

  if (!token) {
    return res.send('Invalid link')
  }

  const resetToken = await ResetToken.findOne({ where: { token } })

  if (!resetToken || resetToken.expiresAt.getTime() < new Date().getTime()) {
    return res.send('Invalid link')
  }

  const hashedPassword = await hashPassword.generateHash(password, 10)
  await User.update({ password: hashedPassword }, { where: { id: resetToken.userId } })
  await resetToken.destroy()

  res.render('login')
}

module.exports = {
  registerUser,
  login,
  logOut,
  loginPage,
  registerPage,
  home,
  forgotPasswordPage,
  forgotPassword,
  resetPasswordPage,
  resetPassword,
}
