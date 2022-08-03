const express = require('express')
const router = express.Router()
const validate = require('./../middleware/validate')
const userValidation = require('./../validations/userValidation')
const userController = require('./../controllers/userController')

router.route('/register').get((req, res) => {
  res.render('register')
})

router.route('/register').post(validate(userValidation.registerUser), userController.registerUser)

router.route('/login').get((req, res) => {
  res.render('login')
})

router.route('/login').post(validate(userValidation.login), userController.login)

router.route('/test').get((req, res) => {
  res.render('test')
})

module.exports = router
