const { Sequelize } = require('sequelize')

const env = process.env.NODE_ENV || 'development'

const config = require('./config')[env]

const sequelize = new Sequelize(config.database, config.username, config.password, config)

const checkAuth = async () => {
  try {
    await sequelize.authenticate()
    console.log('auth success')
  } catch (err) {
    console.log('Error occured ', err)
  }
}

checkAuth()

module.exports = sequelize
