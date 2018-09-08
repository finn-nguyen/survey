module.exports = {
  mongoURI: process.env.MONGODB_URI,
  cookieKey: 'secret',
  stripeSecretKey: process.env.STRIPE_SECRET_KEY,
  sendGridKey: process.env.SENDGRID_API_KEY,
  googleClientID: process.env.CLIENT_ID,
  googleClientSecret: process.env.CLIENT_SECRET
}
