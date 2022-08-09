const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./config/db')
const methodOverride = require('method-override')

const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')

const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const routeNotFound = require('./middleware/notFoundError')
dotenv.config()

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    store: new SequelizeStore({
      expiration: 24 * 60 * 60 * 1000,
      db: db,
    }),
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 60 * 1000 },
  })
)

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded())
app.use(express.static(path.join(__dirname, 'public')))
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const method = req.body._method
      delete req.body._method
      return method
    }
  })
)

app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', userRoutes)
app.use('/product', productRoutes)
app.use('/order', orderRoutes)
app.use('/cart', cartRoutes)

app.use(routeNotFound)

db.sync()
  .then((result) => console.log('sync success'))
  .catch((err) => console.log('sync error ', err.message))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
