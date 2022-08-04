<<<<<<< HEAD
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const db = require('./config/db')
const productRoutes = require('./routes/productRoutes')

dotenv.config()

app.use(express.json())

// Routes

app.use('/product', productRoutes)

db.sync()
  .then((result) => console.log('sync success'))
  .catch((err) => console.log('sync error ', err.message))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
=======
const express = require('express')
const app = express()
const dotenv = require('dotenv')
const db = require('./config/db')
const userRoutes = require('./routes/userRoutes')

dotenv.config()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded())

// Routes

app.use('/user', userRoutes)

db.sync()
  .then((result) => console.log('sync success'))
  .catch((err) => console.log('sync error ', err.message))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
>>>>>>> b496be9f4ebbc1171d60c9341ad2e87aa0957a8d
