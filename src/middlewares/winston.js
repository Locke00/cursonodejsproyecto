import winstonLog from "./src/utils/logger/index.js"

function wintson(req, res, next) {
  try {
    req.logger = winstonLog;  //al objeto de requerimiento logger tengo q configurarle
    const message = `${req.method} ${req.url} - ${(new Date()).toLocaleString()}`;
    //req.method tiene el metodo q estoy usando
    //req.url tiene la url
    //${(new Date()).toLocaleString()}  : fecha actual
    req.logger.HTTP(message);
    //metodos q se pueden usar de req.logguer.HTTP(..), .INFO(..), .WARN(..), .ERROR(..)
    return next();
  } catch (error) {
    return next(error); //si ocurre un error lo pasamos con el return next
  }
}
export default wintson;