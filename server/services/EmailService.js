let nodemailer = require('nodemailer');
let emailContent = require('../views/emails');

let fs = require('fs');
let path = require('path');

let configPath = path.join(__dirname, '../../config.json');
let config = fs.existsSync(configPath) ? JSON.parse(fs.readFileSync(configPath))
    : console.log(`No config file. Configuring ${__filename} with env vars.`);

let AUTO_EMAIL = process.env.AUTO_EMAIL;
let AUTO_PASS = process.env.AUTO_PASS;

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