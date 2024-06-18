import { config } from "dotenv";
import args from "./args.util.js";  // obtengo de args los argumentos

const { env } = args;  //de todos los argumentos, solo traigo en entorno
const path =
  env === "prod" ? "./.env.prod" : env === "dev" ? "./.env.dev" : "./.env.test";
config({ path });  // le indico el path

export default {
  PORT: process.env.PORT,
  DB_LINK: process.env.DB_LINK,
  SECRET: process.env.SECRET,
  SECRET_KEY: process.env.SECRET_KEY,
  GOOGLE_ID: process.env.GOOGLE_ID,
  GOOGLE_CLIENT: process.env.GOOGLE_CLIENT,

};