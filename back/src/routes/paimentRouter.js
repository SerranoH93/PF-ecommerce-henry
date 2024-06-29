const {Router} = require('express')
const { postPay } = require('../controllers/paymentController')

const paymentRoute = Router()

paymentRoute.post('/', postPay)

module.exports = paymentRoute