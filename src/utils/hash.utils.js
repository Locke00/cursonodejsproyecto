import { genSaltSync, hashSync, compareSync } from "bcrypt";

const createHash = (password) => password = hashSync(password, genSaltSync(10))   //genSaltSync establece el nivel de seguridad

const verifyHash = (req, db) => compareSync(req,db) //req sera la contraseña q viene del requerimiento, db va a ser la contraseña q viene de la db. devolvera un booleano

export { createHash, verifyHash }
// exporto las funciones para poder usarlas en un middleware donde vaya a necesatarlo, o en el middleware de passport