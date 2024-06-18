//import { Router } from "express";
//import { users } from "../../data/mongo/manager.mongo.js";


import passCallBackMid from "../../middlewares/passCallBack.mid.js";
//import has8char from "../../middlewares/has8char.mid.js";
//import isValidPassword  from "../../middlewares/isValidPass.mid.js"
import passport from "../../middlewares/passport.mid.js";
import CustomRouter from "../CustomRouter.js";


import {
  register,
  login,
  google,
  github,
  me,
  signout,
  badauth,
  verifyAccount
} from "../../controllers/sessions.controller.js";

class SessionsRouter extends CustomRouter{
  init(){
        //register
    //(<nombre_del_endpound>, (cheaquear q la contraseña tenga 8 caracteres), <middleware con la estrategia de registro>, <callback>  )
    // ademas, passport se encarga de la creacion del usuario, xq lo q ya no tengo q ponerlo en el cuerpo de este endpoint
    // failureRedirect: permite redireccionar en caso q haya habido un problema
    this.create("/register", ["PUBLIC"], passCallBackMid("register"), register);
    //ya q passport se va a encargar de verificar el usuario y la contraseña
    //entonces login solo se va a encargar de manejar la respuesta:
    
    //login   //ej de usuario: franco3@gmail.com/hola1234
    //ya q passport se va a encargar de verificar el usuario y la contraseña
    //entonces login solo se va a encargar de manejar la respuesta:
    this.create("/login", ["PUBLIC"], passCallBackMid("login"), login);    
    
    

        //google      , cuando vaya a este endpoint me va a llevar a la pantalla de consentimiento
    //si da exito, va a ir automaticamente al endpoint: /api/google/callback
    //como lo definimos en el parametro callbackURL, de la estrategia de google, q esta en passport.mid.js
    //lo voy a probar con get para probarlo con la url en el navegador
    //DEBE SER UN POST PARA LO Q EJECUTE EL EVENTO DE CLICK EN EL BOTON DE GOOGLE
    this.create(   //post
      "/google",
      passport.authenticate("google", { scope: ["email", "profile"] }) // cuando pongo asi el scope le digo q tome como parametro principal
      //el email, y q ponga todos los datos en profile
    ); // a este enpoint es q tengo q fetchear si quiero logearme usando el google
    
    //google-callback
    this.read(    //get
      // puedo ponerle post y lo mismo va a funcionar. pero es mas seguro q ande si le pongo un post
      "/google/callback",
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      google
    );
    
    this.create(
      "/github",
      ["PUBLIC"],
      passport.authenticate("github", { scope: ["email", "profile"] })
    );
    this.read(
      "/github/callback",
      ["PUBLIC"],
      passport.authenticate("github", {
        session: false,
        failureRedirect: "/api/sessions/badauth",
      }),
      github
    );

    //me,   vamos a hacer un post para ver mis datos
    this.create("/",["PUBLIC","USER","PREM","ADMIN"], me);



    /*//signout
    sessionsRouter.post("/signout", async (req, res, next) => {
      try {
        req.logout();
        return res.json({
          statusCode: 200,
          message: "Signed out",
        });
      } catch (error) {
        return next(error);
      }
    });*/

    /*    this.create("/signout", ["PUBLIC"], async (req, res, next) => { //post
      try {
        return res.clearCookie("token").success200("Signed out");
        //json({  //tengo q eliminar la cookie
        //  statusCode: 200,
        //  message: "Signed out",
        //  //session: req.session, no voy a devolver la sesion
        //});
      } catch (error) {
        return next(error);
      }
    });*/


    //signout
    //failureRedirect: "/api/sessions/signout/cb"  le agrego para q en caso q falle(x ej si intento desloguearme estando deslogueado, no me aparezca el error de unauthorized)
    this.create(
      "/signout",
      ["PUBLIC"],
      //passCallBackMid("jwt"),
      signout
    );
    
    this.read("/signout/cb", ["PUBLIC"], (req, res, next) => {
      try {
        return res.error400("Already done")
      } catch (error) {
        next(error);
      }
    });

    
    //this.read(
    //  "/me",
    //  ["PUBLIC"],
    //  //passport.authenticate("jwt", {
    //  //  session: false,
    //  //  failureRedirect: "/api/sessions/signout/cb",
    //  //}),
    //  passCallBackMid("jwt"),
    //  async (req, res, next) => {
    //    try {
            //winstonLog.INFO("--start--");
            //winstonLog.INFO(JSON.stringify(req));
            //winstonLog.INFO("--end--");
    //      let user = req.user
    //      return res.success200(user)
    //    } catch (error) {
    //      return next(error);
    //    }
    //  }
    //);


    this.read("/badauth", ["PUBLIC"], badauth);

    this.create("/verify", ["PUBLIC"], verifyAccount)

    


  }


}

let sessionsRouter = new SessionsRouter();
export default sessionsRouter.getRouter();



/*

    //me,   vamos a hacer un post para ver mis datos de sesion
    this.create("/", async (req, res, next) => {  //post
      try {
        if (req.session.email) {
          return res.json({
            statusCode: 200,
            message: "Session with email: " + req.session.email,
            //session: req.session,
          });
        } else {
          const error = new Error("Bad Auth");
          error.statusCode = 401;
          throw error;
        }
      } catch (error) {
        return next(error);
      }
    });


*/