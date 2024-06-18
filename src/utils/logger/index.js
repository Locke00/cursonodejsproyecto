//aqui voy a usar el patron factory, para elegir el logger segun el entonrno
//const persistence = process.env.MODE || "PROD";
//import argsUtil from "../../utils/args.util.js";
import argsUtil from "../args.util.js";

const environment = argsUtil.env;

let logger;

switch (environment) {
  case "prod":
    const { default: winstonProd } = await import("./winston.utils.js");
    logger = winstonProd
    break;
  default:
    const { default: winstonDev } = await import("./winstonDev.utils.js");
    logger = winstonDev
    break;
}

export default logger;