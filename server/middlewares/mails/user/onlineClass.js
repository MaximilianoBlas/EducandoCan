const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "silvamaxiblas@gmail.com", // tu correo de Gmail
      pass: "arfi bmci loxh rtpr", // tu contraseña de aplicación generada
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {

    console.log('entra a main')
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Hola" <silvamaxiblas@gmail.com>', // sender address
    to: "lalala@yopmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

// main().catch(console.error);

module.exports = {main}