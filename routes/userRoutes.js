const express = require('express')
const router = express.Router()
const validate = require('./../middleware/validate')
const userValidation = require('./../validations/userValidation')
const userController = require('./../controllers/userController')
const verifySession = require('./../middleware/verifySession')

//Register routes
router.get('/register', userController.registerPage)
router.post('/register', validate(userValidation.registerUser), userController.registerUser)

// Login routes
router.get('/login', userController.loginPage)
router.post('/login', validate(userValidation.login), userController.login)

// Logout route
router.all('/logout', userController.logOut)

//Forgot Password
router
  .route('/forgotPassword')
  .get(userController.forgotPasswordPage)
  .post(validate(userValidation.verifyEmail), userController.forgotPassword)

router
  .route('/resetPassword/:token')
  .get(userController.resetPasswordPage)
  .post(validate(userValidation.resetPassword), userController.resetPassword)
router.use(verifySession)

// Home page
router.get('/', userController.home)

module.exports = router
