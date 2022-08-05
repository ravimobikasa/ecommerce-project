const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const db = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
dotenv.config()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded())

app.use(express.static(path.join(__dirname, 'public')))

// Routes

app.use('/user', userRoutes)
app.use('/product', productRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
