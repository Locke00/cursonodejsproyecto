import { createLogger, format, transports, addColors } from "winston";
//transports: array de clases
//addColors, para dar colores
const { colorize, simple } = format;

const levels = { FATAL: 0, ERROR: 1, INFO: 2, HTTP: 3 };
const colors = { FATAL: "red", ERROR: "yellow", INFO: "blue", HTTP: "green", WARN: "yellow" };
//http es para las peticiones
addColors(colors); //agregamos la paleta de colores al logger, compatibilizando los niveles con los colores

export default createLogger({  
  levels,
  format: colorize(),        //le paso q me colorize, lo va a hacer con las 3 lineas de arriba del export default
  transports: [              //le paso los niveles
    new transports.Console({ level: "HTTP", format: simple() }),  //el nivel http lo va a mostrar x consola(transporte tipo consola)
  ],
});
//el nivel http va a registrar los errores: http, info, warn y error
//el nivel warn va a registrar los errores: warn y error

