const nodeMailer = require('nodemailer');

const sendEmail = (to, subject, text, token) => {
  const templates = {
    newUser: `Bievenido a Mind Money Business, por favor da click en el siguiente link' /reset/${token}`
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
    to,
    subject,
    text: templates[text]
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return logger.info(error);
    }
    return logger.info(info.messageId);
  });
};

module.exports = sendEmail;
