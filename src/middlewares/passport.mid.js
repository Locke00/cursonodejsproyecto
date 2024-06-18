import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { createHash, verifyHash } from "../utils/hash.utils.js";
//import users from "../data/mongo/manager.mongo.js";
import winstonLog from "../utils/logger/index.js";

import dao from "../data/index.factory.js";
const { users } = dao
//import UserDTO from "../dto/user.dto.js";

import service from "../services/users.service.js"

import { createToken } from "../utils/token.util.js";
const { GOOGLE_ID, GOOGLE_CLIENT } = process.env;
import repository from "../repositories/users.rep.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      //winstonLog.INFO("1111111");
      //async porque hare muchas consulas. si fuera en memoria no seria necesario el sync
      try {
        //verifico q el usuario no existe
        //hasheo la contraseña
        //registra elusuario
        //let one = await users.readByEmail(req.body.email)   //let xq le tengo q cambiar la contraseña. puedo hacerlo alternativamente con la linea de abajo
        let one = await repository.readByEmail(email); //puedo buscar el email del requerimiento o de la misma callback(xq email === req.body.email)
        if (one) {
          //winstonLog.INFO(JSON.stringify(one));
          done(null, false, { statusCode: 401 }); //si el usuario existe no puedo re-registrarlo, x lo tanto la estrategia termina aca
        } else {
          ////let data = req.body;
          ////data.password = createHash(password);
          //let user = await users.create(data);
          const user = await repository.create(req.body);
          console.log({user})
          //winstonLog.INFO(JSON.stringify(user));
          return done(null, user);
        }
        //en caso contrario NO DEJO re-registrar
      } catch (error) {
        done(error);
      }
    }
  )
);






passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await users.readByEmail(email);
        winstonLog.INFO(JSON.stringify(user));
        if (user?.verified && verifyHash(password, user.password)) {
          //estos dos los comento xq voy a hacer q las sesiones las maneje jwt
          //req.session.email = email;
          //req.session.role = user.role;
          
          const token = createToken({ email, role: user.role });  //crea el token con jwt
          winstonLog.INFO(JSON.stringify(token));
          //winstonLog.INFO("creado el token");
          req.token = token;
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "signout",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await users.readByEmail(email);
        if (user && verifyHash(password, user.password)) {
          //estos dos los comento xq voy a hacer q las sesiones las maneje jwt
          //req.session.email = email;
          //req.session.role = user.role;
          req.logout()
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);




//estategia de google:
passport.use(
  "google",
  new GoogleStrategy(
    {
      passReqToCallback: true, //true para q la estrategia tenga acceso al objeto de requerimientos
      clientID: GOOGLE_ID,
      clientSecret: GOOGLE_CLIENT,
      callbackURL: "http://localhost:8080/api/sessions/google/callback",
    },
    async (req, accessToken, refreshToken, profile, done) => {
      // en profile google me va a mandar unmonton de datos del usuario
      //tb da un accessToken y refreshToken(me los devuelve para q los use en caso de necesidad)
      try {
        winstonLog.INFO(JSON.stringify(profile));
        let user = await users.readByEmail(profile.id+"gmail.com"); // primero veo si ya el usuario se creo anteriormente
        //Ahora vamos a guardar los datos del requerimiento con datos de la session
        winstonLog.INFO(profile.id);
        if (user) {
          //primero lleno la session
          req.session.email = user.email; //(o en su lugar puedo poner profile.id, cualquiera va bien )
          req.session.role = user.role;
          return done(null, user); // si existe el usuario, lo logueo
        } else {
          // si no existe el usuario, lo registro y lo logueo
          user = {
            // primero completo los valores del usuario
            email: profile.id + "@gmail.com", //esta es la propiedad q mas me interesa
            name: profile.name.givenName,
            lastName: profile.name.familyName,
            photo: profile.coverPhoto,
            //password: createHash("hola1234")
            password: createHash(profile.id), //mas recomendado
          };
          user = await users.create(user); //creo el usuario
          //req.session.email = user.email; //pongo sus datos como variable de sesion
          //req.session.role = user.role;
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "jwt", // en nombre q le voy a poner a la estrategia. luego va el constructor de la estrategia el cual recibe 2 parametros
  new JwtStrategy({       //el constructor recibe 2 parametros. el objeto de configuracion
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies["token"]]),  //se fija si en req hay una propiedad cookies, q se llame token
      secretOrKey: process.env.SECRET,
    },
    async (payload, done) => {  //el 2do parametro q recibe es una callback asyncrona. (asi como la llame payload, le podria haber puestro otro nombre)
      try {
        const user = await users.readByEmail(payload.email);  //primero busco el usuario en el manager de usuarios
        if (user) {
          user.password = null;           //le protejo la contraseña poniendole como null
          return done(null, user);        //agrega al objeto de requerimientos una propiedad user con los datos del usuario q encontré
        } else {
          return done(null, false);  // cuando no existe el usuario
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);
//payload es el resultado de la carga de los datos destokenizados. dentro del payload tengo la propiedad email



export default passport;
