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
