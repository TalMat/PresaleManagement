let nodemailer = require('nodemailer');
let emailContent = require('../views/emails');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.AUTO_EMAIL,
        pass: process.env.AUTO_PASS
    }
});

function sendConfirmationEmail(to){
    const mailOpt = {
        from: process.env.AUTO_EMAIL,
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
        from: process.env.AUTO_EMAIL,
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