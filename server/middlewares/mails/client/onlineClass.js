const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "silvamaxiblas@gmail.com", // tu correo de Gmail
      pass: process.env.GPASSWORD, // tu contraseña de aplicación generada
    },
});

// async..await is not allowed in global scope, must use a wrapper
async function onlineClassForClient(clientInfo) {

    console.log('entra a main')
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '<silvamaxiblas@gmail.com>', // sender address
    to: clientInfo.email, // list of receivers
    subject: "Confirmación de clase online ✔", // Subject line
    text: `Hola ${clientInfo.name}, se confirmo la clase Online de EducandoCan para el ${clientInfo.start} en 'tal enlace' `, // plain text body
    html: `Hola ${clientInfo.name}, se confirmo la clase Online de EducandoCan para el ${clientInfo.start} en 'tal enlace' `, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

// main().catch(console.error);

module.exports = {onlineClassForClient}