const ampq = require('amqplib/callback_api');
const transporter = require("./config/transporter")
const MailTemplateSchema = require('../models/MailTemplate')
const MailSentLog = require('../models/MailSentLog')

const ampq = require('amqplib/callback_api');

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
        channel.consume(QUEUE, (mailbuffer) => {
            mail = JSON.parse(mailbuffer.content.toString())

            // Comlete the mail task
            transporter.sendMail(mail, (error, info) => {
                console.log(`Message sent: ${info.messageId} to ${to}`);
            })
        })
    }, {
        noAck: true // For deleting the received queue
    })
})