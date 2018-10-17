let nodemailer = require('nodemailer');
let emailContent = require('../views/emails');

let AUTO_EMAIL = process.env.AUTO_EMAIL;
let AUTO_PASS = process.env.AUTO_PASS;

let moment = require('moment');
let dateForm = 'MM.DD.YY h:mmA';

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: AUTO_EMAIL,
        pass: AUTO_PASS
    },
    secure: false
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
            console.log(`Error sending confirmation email | ${to} | ${moment().format(dateFormat)}`);
            console.log(err);
        } else {
            console.log(`Confirmation email Success | ${info.accepted[0]} | ${moment().format(dateFormat)}`);
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
            console.log("Shipping email Error:");
            console.log(err);
        } else {
            console.log("Shipping email Success:");
            console.log(info);
        }
    });
}

module.exports = {
    sendConfirmationEmail,
    sendShippedEmail
};