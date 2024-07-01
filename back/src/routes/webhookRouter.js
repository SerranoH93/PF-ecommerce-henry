const {Router} = require('express')
const { postWebhook } = require('../controllers/webhookController')

const webhookRoute = Router()

webhookRoute.post('/', postWebhook)

module.exports = webhookRoute