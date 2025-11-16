import nodemailer from "nodemailer";

export default async function sendEmail(to, html) {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: "tu_correo_outlook@hotmail.com",
      pass: "tu_clave_de_aplicacion"
    }
  });

  await transporter.sendMail({
    from: "FIXALL <tu_correo_outlook@hotmail.com>",
    to,
    subject: "Código para restablecer contraseña",
    html
  });
}
