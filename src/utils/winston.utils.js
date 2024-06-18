/*import { createLogger, format, transports, addColors } from "winston";
//transports: array de clases
//addColors, para dar colores
const { colorize, simple } = format;

const levels = { FATAL: 0, ERROR: 1, INFO: 2, HTTP: 3 };

export default createLogger({  
  levels,
  format: colorize(),        //le paso q me colorize, lo va a hacer con las 3 lineas de arriba del export default
  transports: [              //le paso los niveles
    new transports.Console({ level: "HTTP", format: simple() }),  //el nivel http lo va a mostrar x consola(transporte tipo consola)
    new transports.File({    //transporte de tipo file
      level: "ERROR",         //nivel warn
      format: simple(),
      filename: "./src/utils/errors/errors.log",   
    }),
  ],
});
//el nivel http va a registrar los errores: http, info, warn y error
//el nivel warn va a registrar los errores: warn y error
*/
