require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const amqp = require('./message_brokers/amqp')
const logger = require('./utils/logger')

amqp.connectToAmqp().then(_ => logger.info('AMQP connected!'))

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

const webhookController = require('./controllers/webhook_controller')

app.post('/', webhookController.processWebhook)

module.exports = app
