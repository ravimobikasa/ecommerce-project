const express = require('express')
const router = express.Router()
const validate = require('./../middleware/validate')
const userValidation = require('./../validations/userValidation')
const userController = require('./../controllers/userController')

router.route('/').post(validate(userValidation.registerUser), userController.registerUser)

// router.route('/login').post(validate(userValidation.login), userController.loginUser)

module.exports = router
