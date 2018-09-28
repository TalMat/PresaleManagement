let nodemailer = require('nodemailer');
let emailContent = require('../views/emails');
let config = require('../../config');

let AUTO_EMAIL = config.AUTO_EMAIL || process.env.AUTO_EMAIL;
let AUTO_PASS = config.AUTO_PASS || process.env.AUTO_PASS;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: AUTO_EMAIL,
        pass: AUTO_PASS
    }
});

function sendConfirmationEmail(to){
    const mailOpt = {
        from: AUTO_EMAIL,
        to,
        subject: 'Order Confirmation',
        html: emailContent.confirmation()
    };

    transporter.sendMail(mailOpt, (err, info) => {
        if(err){
            console.log(err);
        } else {
            console.log(info);
        }
    });
}

function sendShippedEmail(to){
    const mailOpt = {
        from: AUTO_EMAIL,
        to,
        subject: 'Order Shipped',
        html: emailContent.shipment()
    };

    transporter.sendMail(mailOpt, (err, info) => {
        if(err){
            console.log(err);
        } else {
            console.log(info);
        }
    });
}

module.exports = {
    sendConfirmationEmail,
    sendShippedEmail
};