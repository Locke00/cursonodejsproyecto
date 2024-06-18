import { Command } from "commander";// traigo el constructor de comandos del comander

const args = new Command();

args.option("-p <port>", "port");
args.option("--env <env>", "environment", "prod");  // en la ppt esta como mode
                  // hago q por default este en entorno "prod"
// - si es SOLO una letra
// -- si es MAS de una letra 

args.parse();
export default args.opts();