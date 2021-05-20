const nodemailer = require("nodemailer");
require("dotenv").config();

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER_MAIL,
      pass: process.env.USER_MAIL_PASSWORD,
    }
  });
  const send = (mail,user,token) => {
  var mailOptions = {
    from: process.env.USER_MAIL,
    to: mail,
    subject: 'Mail from flipkart',
    html: `<h1>Hey you are logged in as ${user}!</h1><a href="http://127.0.0.1:3000/api/verify/${token}">Click to verify<a/>`
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = send;