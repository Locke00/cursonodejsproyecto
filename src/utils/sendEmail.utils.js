import { createTransport } from "nodemailer";//no importo todo el modulo,
                                             //sino solo el creador del transporte
//import winstonLog from "../utils/logger/index.js";

async function sendEmail(data) {  //se envia data.email, data.name y data.verifiedCode
  try {
    //winstonLog.INFO(JSON.stringify(data));
    const transport = createTransport({
      service: "gmail",       //aqui puede ir otro servicio como el outlook, etc
      port: process.env.PORT, //funciona el puerto 8080, aunq no es lo mas recomendable
      auth: {                 //nosotros usaremos el puerto 8080
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });
    await transport.sendMail({   //lo q ponga en CODER va a figurar como remitente
      from: `CODER <${process.env.GOOGLE_EMAIL}>`,   //desde q mail estoy enviando
      to: data.email,                                //a quien le tengo q enviar
      subject: `USER ${data.name.toUpperCase()} REGISTERED!`,  //el asunto del mail
      html: `
        <h1>USER REGISTERED!<h1>
        <p>VERIFY CODE: ${data.verifiedCode}</p>
      `,  // en html va el template de cuerpo del mail
    });
    return data
  } catch (error) {
    throw error;
  }
}

export default sendEmail;  // esto va a ser importado x la capa de servicios
