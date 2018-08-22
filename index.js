require('dotenv').config()
const express = require('express')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const app = express()
const PORT = process.evn.PORT || 5000

passport.use(new GoogleStrategy())

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))
