const nodemailer = require('nodemailer')

var transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.USER_MAIL || '',
        pass: process.env.USER_MAIL_PASSWORD || ''
    }
})

//Default config for sending mail, can be overwritten by options
var mailOptions = {
    from: process.env.USER_MAIL,
    to: process.env.USER_MAIL,
    subject: 'DiabetNotes',
    text: 'Sendt from DiabetNotes'
}

module.exports = {
    sendMail: options => new Promise((resolve, reject) => transporter.sendMail({ ...mailOptions, ...options }, (err, info) => {
        if (err) return reject(err)
        return resolve(info)
    }))
}