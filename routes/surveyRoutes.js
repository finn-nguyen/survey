const _ = require('lodash')
const Path = require('path-parser').default
const { URL } = require('url')
const requireLogin = require('../middlewares/requireLogin')
const requireCredits = require('../middlewares/requireCredits')
const Mailer = require('../services/mailer')
const surveyTemplate = require('../services/emailTemplates')
const Survey = require('../models/Survey')

module.exports = app => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) =>{
    res.send('Thanks for voting!')
  })

  app.post('/api/surveys', requireLogin, requireCredits, async(req, res) => {
    const { title, subject, body, recipients } = req.body
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now()
    })
    // send email
    const mailer = new Mailer(survey, surveyTemplate(survey))
    try {
      await mailer.send()
      await survey.save()
      req.user.credits -= 1
      const user = await req.user.save()
      res.send(user)
    } catch(err) {
      res.status(422).send(err)
    }
  })

  app.post('/api/surveys/webhooks', (req, res) => {
    const events = _.map(req.body, event => {
      const pathname = new URL(event.url).pathname
      const p = new Path('/api/surveys/:surveyId/:choice')
      const match = p.test(pathname)
      if (match) {
        return { email: event.email, surveyId: match.surveyId, choice: match.choice }
      }
    })
    const compactEvents = _.compact(events)
    const uniqueEvents = _.uniqBy(compactEvents, 'email', 'surveyId')
    _.each(uniqueEvents, (event) => {
      Survey.updateOne(
        {
          _id: event.surveyId,
          recipients: {
            $elemMatch: { email: event.email, responded: false }
          }
        }, {
          $inc: { [event.choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }
      ).exec()
    })
    res.send({})
  })
}
