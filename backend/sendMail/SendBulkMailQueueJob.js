const ampq = require('amqplib/callback_api');

const SendBulkMailQueueJob = async (mailTemplate, recipients, initiator) => {

    // Step 1: Create Connection
    ampq.connect(process.env.CLOUDAMQP_URL, (connError, connection) => {

        if (connError) {
            throw connError;
        }

        // Step 2: Create Channel
         connection.createChannel(async (channelError, channel) => {
            if (channelError) {
                throw channelError
            }
            // Step 3: Assert Queue
            const QUEUE = 'bulkemail'
            channel.assertQueue(QUEUE)

            // Send message to queue
            await recipients.forEach(async recipient => {
                const mail = { ...mailTemplate, to: recipient, initiator }
                channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(mail)))
            })
            console.log(`Sent job to queue to send mail to ${recipients}`)
        })
    })
}

module.exports = SendBulkMailQueueJob