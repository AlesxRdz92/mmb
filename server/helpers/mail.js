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
        link: `http://localhost:8080/confirm/${to.token}`,
        body: 'Gracias por querer ser parte de Mind Money Business, estas a un solo paso de tener tu cuenta, por favor confirma dando click al siguiente boton.',
        but: 'Confirmar Email',
        title: 'Confirma tu Email',
        down: 'Una vez que confirmes tu correo eletronico, podras realizar compras y agendar citas en Mind Money Business.'
      }
    },
    forgotPassword: {
      subject: '¿Olvidaste tu contraseña?',
      template: '/emailConfirmationTemplate.html',
      mustacheTemplate: {
        name: to.name,
        link: `http://localhost:8080/forgot/${to.token}`,
        body: 'Gracias por ponerte en contacto con nosotros para recuperar tu contraseña de Mind Money Business, el enlace solo funcionara durante la siguiente hora',
        but: 'Recuperar contraseña',
        title: 'Recupera tu cuenta',
        down: 'Una vez que generes tu contraseña podras ingresar nuevamente a la plataforma.'
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
