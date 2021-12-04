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

        // Receive message from queue
        channel.consume(QUEUE, async (mailbuffer) => {
            console.log(`${process.env.BEP_SERVER_URL}/process-single-email`)
            mail = JSON.parse(mailbuffer.content.toString())

            // Send reuest here with data as mail // session id
            await new Promise(resolve => setTimeout(resolve, Math.random() * 1400))
            await axios.post(`${process.env.BEP_SERVER_URL}/process-single-email`, mail)
                .then(data => {
                    console.log("------------------     success consume")
                    console.log(data.data.comment)
                })
                .catch(err => {
                    console.log("------------------     error consume")
                    // console.log(data.data.comment)
                })
            setTimeout(function(){
                channel.ack(mailbuffer);
              },500);
        })
    }, {
        // noAck: true // For deleting the received queue as soon as  received
    })
})