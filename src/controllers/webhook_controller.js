const { parsePayload } = require('../services/webhook_service')
const amqp = require('../message_brokers/amqp')

const processWebhook = (req, res) => {
  const payload = JSON.stringify(parsePayload(JSON.parse(req.body.payload)))
  const bufferedString = Buffer.from(payload, 'utf-8')
  amqp.publish(bufferedString)
  res.send('ok')
}

module.exports = {
  processWebhook
}
