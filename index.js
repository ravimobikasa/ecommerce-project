const express = require('express')
const app = express()
const dotenv = require('dotenv')
const db = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')

dotenv.config()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded())

// Routes

app.use('/user', userRoutes)
app.use('/order', orderRoutes)

/*
db.sync()
  .then((result) => console.log('sync success'))
  .catch((err) => console.log('sync error ', err.message))
*/

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
