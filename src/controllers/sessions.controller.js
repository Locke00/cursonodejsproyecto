import service from "../services/users.service.js";
import winstonLog from "../utils/logger/index.js";

class SessionsController {
  constructor() {
    this.service = service;
  }
  register = async (req, res, next) => {
    try {
      const { email, name, verifiedCode} = req.user;  // toma las variables del body
      let userInfo = await this.service.register({ email, name, verifiedCode });  //y las envia al register del servicio
      // return res.success201(req.user);
      return res.status(200).json({ statusCode: 201, response: req.user });
    } catch (error) {
      return next(error);
    }
  };
  login = async (req, res, next) => {
    try {
      return res
        .cookie("token", req.token, { // el valor del token esta en el objeto requerimientos
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,// httpOnly: true   permite q no se pueda acceder a la cookie dsd el navegador
        })  // esto permite q cuando se loguee bien al usuario se le cree el cookie 
        .success200("Logged in");
    } catch (error) {
      return next(error);
    }
  };
  /*me = async (req, res, next) => {  //post
    try {
      if (req.user) {
        return res.success200("User logged with email: " + req.user.email)
      } else {
        return res.error400("No esta logueado")
      }
    } catch (error) {
      return next(error);
    }
  }*/


  google = async (req, res, next) => {
    try {
      return res.success200("Logged in with Google!");
    } catch (error) {
      return next(error);
    }
  };
  github = async (req, res, next) => {
    try {
      return res.success200("Logged in with Github!");
    } catch (error) {
      return next(error);
    }
  };
  me = async (req, res, next) => {
    try {
      winstonLog.INFO(JSON.stringify(req.user));
      const user = {
        email: req.user.email,
        role: req.user.role,
        photo: req.user.photo,
      };
      return res.success200(user);
    } catch (error) {
      return next(error);
    }
  };
  signout = async (req, res, next) => {
    try {
      return res.clearCookie("token").success200("Signed out!");
    } catch (error) {
      return next(error);
    }
  };
  badauth = (req, res, next) => {
    try {
      return res.error401();
    } catch (error) {
      return next(error);
    }
  };
  verifyAccount = async (req, res, next) =>{
    try {
      const { email, verifiedCode } = req.body;  //del body obtengo el email y el verifiedCode
      const user = await service.readByEmail(email);
      if (user.verifiedCode === verifiedCode) {  //si el codigo q pone el usuario es el mismo q esta guardado en la db
        await service.update(user._id, { verified: true });  // lo pongo como verificado
        return res.json({
          statusCode: 200,
          message: "Verified user!",
        });
      } else { 
        return res.json({
          statusCode: 400,
          message: "Invalid verification token!",
        });
      }
    } catch (error) {
      return next(error);
    }
  }
}

export default SessionsController;
const controller = new SessionsController();
const { register, login, google, github, me, signout, badauth, verifyAccount } = controller;
export { register, login, google, github, me, signout, badauth, verifyAccount };
