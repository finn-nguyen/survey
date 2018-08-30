require('dotenv').config()
const express = require('express')
const app = express()
const cookieSession = require('cookie-session')
const passport = require('passport')
const mongoose = require('mongoose')
const keys = require('./config/keys')
mongoose.connect(keys.mongoURI)

app.use(
  cookieSession({
    maxAge: 30*24*60*60*1000,
    keys: [keys.cookieKey]
  })
)

app.use(passport.initialize())
app.use(passport.session())

require('./services/passport')
require('./routes/authRoutes')(app)
require('./routes/billingRoutes')(app)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))
