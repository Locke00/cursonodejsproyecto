import passport from "passport";
import winstonLog from "../utils/logger/index.js";

export default (strategy) => {
  return async(req, res, next) => {
    passport.authenticate(strategy, (error, user, info)=>{
      ///winstonLog.INFO("222");

      //winstonLog.INFO(JSON.stringify({error, user, info}));
      if (error) {
        return next(error)
      }
      if (!user) {   // usualmente no existe el usuario cuando tdvia no estoy autenticado
        return res.error401("No autenticado")
        /*return res.json({
          statusCode: info.statusCode || 401,    //401 porque lo estoy usando para autenticar. si lo utilizo para autorizar, ya deberia ser diferente el error
          message: info.messages || info.toString()  //xq a aveces lo puedo querer configurar manual, y entonces uso info.message. (jwt usualmente lo hace a toString())
        })*/

      }
      req.user = user  // si existe el usuario, guardamos el usuario en el objeto de requerimiento
      winstonLog.INFO(JSON.stringify({error, user, info}));
      return next()  // luego hacemos next para q pase al middleware o a la funcion original

    })(req, res, next)   // esta funcion acabamos de codear la tenemos q ejecutar con los objetos req, res y next
  }
}