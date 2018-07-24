let nodemailer = require('nodemailer');

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
        html: '<h1>WOW IT REALLY WORKS</h1>'
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
    sendConfirmationEmail
};