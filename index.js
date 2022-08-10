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
const orderController = require('./controllers/orderController')
dotenv.config()
const stripe = require('stripe')(
  'sk_test_51LUnlrSApwaIyK3wlHrf3Guid5dTNw5TvPydH5r4mVwjkkkmlS25Uis6UCBImO3SWTuehzNdVXOClXDog22OuTPd002sqXHvdZ'
)

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


app.post('/webhook', express.raw({ type: 'application/json' }), orderController.stripeWebHook)

// app.post('/webhook', express.raw({ type: 'application/json' }), async (request, response) => {
//   const sig = request.headers['stripe-signature']

//   let event
//   try {
//     event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret)
//   } catch (err) {
//     console.log(err.message)
//     response.status(400).send(`Webhook Error: ${err.message}`)
//     return
//   }

//   // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const data = event.data.object

//       console.log(data)

//       const customer = await stripe.customers.retrieve(data.customer)

//       break

//     case 'checkout.session.completed':
//       const session = event.data.object
//       const sessionDetail = await stripe.checkout.sessions.listLineItems(session.id, {
//         expand: ['data.price.product'],
//       })

//       break

//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`)
//   }

//   response.send()
// })

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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

// Redirecting user to product page.
// app.use('/', (req, res, next) => {
//   res.redirect('/product')
// })

// app.use(routeNotFound)

db.sync({ alter: true })
  .then((result) => console.log('sync success'))
  .catch((err) => console.log('sync error ', err.message))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
