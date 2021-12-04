const MailTemplateSchema = require("../models/MailTemplate")
const MailTemplate1 = require("./MailTemplate1")
const MailTemplate2 = require("./MailTemplate2")
const mongoose = require('mongoose')

const MailTemplate = [MailTemplate1, MailTemplate2] // More tempalte can be added here

const AddTemplateMailToDatabase = async () => {
    const db = await mongoose.connect(process.env.BEP_MONGODB_URL, {
        keepAliveInitialDelay: 36000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: false,
        socketTimeoutMS: 5000,
        connectTimeoutMS: 5000,
    })
        .then((connection) => {

            // Adding temlate to databse
            console.log("Connected to database")
            MailTemplate.forEach((template) => {
                mail = new MailTemplateSchema({
                    ...template
                })
                mail.save()
                console.log(`Template models ${template.templateNumber} added to Database`)
            });
            process.exit()
        })
        .catch(err => {
            console.log(err)
        })

}

AddTemplateMailToDatabase()