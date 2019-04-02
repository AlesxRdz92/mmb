const nodeMailer = require('nodemailer');
const fs = require('fs');
const Mustache = require('mustache');

const sendEmail = (to, subject) => {
  const templates = {
    newUser: {
      subject: 'Bienvenido a Mind Money Business',
      template: '/emailConfirmationTemplate.html',
      mustacheTemplate: {
        name: to.name,
        link: 'https://www.facebook.com/'
      }
    }
  };

  let transporter = nodeMailer.createTransport({
    host: process.env.HOSTMAIL,
    port: process.env.PORTMAIL,
    secure: false,
    auth: {
      user: process.env.USERMAIL,
      pass: process.env.PASSMAIL
    }
  });

  let mailOptions = {
    from: process.env.USERMAIL,
    to: to.email,
    subject: templates[subject].subject
  };

  fs.readFile(__dirname + templates[subject].template, 'utf8',(err, htmlTemplate) => {
    if (err) {
      console.log(err)
    } else {
      var rendered = Mustache.render(htmlTemplate, templates[subject].mustacheTemplate);
      mailOptions.html = rendered;
      transporter.sendMail(mailOptions, (err, info) => {
        if (err){
          console.log(err)
        }
      });
    }
  });
};

module.exports = sendEmail;
