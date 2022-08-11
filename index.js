const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const session = require('express-session')
const helmet = require('helmet')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./config/db')
const methodOverride = require('method-override')

const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')

const productRoutes = require('./routes/productRoutes')
const cartRoutes = require('./routes/cartRoutes')
const routeNotFound = require('./middleware/notFoundError')
const orderController = require('./controllers/orderController')
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

app.post('/webhook', express.raw({ type: 'application/json' }), orderController.stripeWebHook)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'public')))

// Set security HTTP headers
app.use(helmet())

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      const method = req.body._method
      delete req.body._method
      return method
    }
  })
)

// Routes
app.use('/', userRoutes)
app.use('/product', productRoutes)
app.use('/order', orderRoutes)
app.use('/cart', cartRoutes)

//Redirecting user to product page.
app.use('/', (req, res, next) => {
  res.redirect('/product')
})

app.use('/', (req, res, next) => {
  res.redirect('/product')
})

app.use(routeNotFound)

db.sync({ alter: true })
  .then((result) => console.log('sync success'))
  .catch((err) => console.log('sync error ', err.message))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
