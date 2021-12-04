const MailTemplate2 = {
    templateNumber: 2,
    from: 'termination@example.com',
    subject:'Account Termination Notice',
    html:`<h1>Hello {{receiver}},</h1><h2 style="color:yellow; text-align:center">You are receiving this mail. </h2> <h3 style="color:red;">Because we decided to close your account</h3>`,
    text:`Hello {{receiver}}, You are receiving this emil. Because we decided to close your account`,
}

module.exports = MailTemplate2;



