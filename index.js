const express = require('express')
const app = express()
const dotenv = require('dotenv')
const db = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
dotenv.config()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded())

// Routes

app.use('/user', userRoutes)
app.use('/product', productRoutes)
app.use('/cart', cartRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
