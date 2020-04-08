require('dotenv').config()

const amqpUrl = process.env.NODE_ENV === 'production' ? process.env.AMQP_PROD : process.env.AMQP_DEV

module.exports = {
  amqpUrl
}
