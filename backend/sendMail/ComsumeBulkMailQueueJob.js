const ampq = require('amqplib/callback_api')
const axios = require('axios')


// Step 1: Create Connection
ampq.connect(process.env.CLOUDAMQP_URL, (connError, connection) => {
    if (connError) {
        throw connError;
    }

    // Step 2: Create Channel
    connection.createChannel((channelError, channel) => {
        if (channelError) {
            throw channelError
        }

        // Step 3: Assert Queue
        const QUEUE = 'bulkemail'
        channel.assertQueue(QUEUE)
        channel.prefetch(2)

        // Receive message from queue
        channel.consume(QUEUE, async (mailbuffer) => {
            const mail = JSON.parse(mailbuffer.content.toString())
            await axios.post(`${process.env.BEP_SERVER_URL}/process-single-email`, mail)
                .then(data => {
                    console.log(`Consuming Queue Mail sent to ${mail.to}`)
                })
                .catch(err => {
                    console.log("------------------error consume mail")
                })
        })
    }, {
        noAck: true // For deleting the received queue as soon as  received
    })
})