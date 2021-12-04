const MailTemplate1 = {
    templateNumber: 1,
    from: 'policy@example.com',
    subject:'About our recent changes in our policies',
    html:`<h1>Hello {{receiver}},</h1><h2 style="color:blue; text-align:center">You are receiving this emil. </h2> <h3 style="color:brown;">Because I this to you</h3>`,
    text:`Hello {{receiver}}, You are receiving this emil. Because I this to you`,
}

module.exports = MailTemplate1;



