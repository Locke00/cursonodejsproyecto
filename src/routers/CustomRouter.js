import { Router } from "express";
import jwt from "jsonwebtoken";
//import users from "../data/mongo/manager.mongo.js";
import dao from "../data/index.factory.js";
const { users } = dao

export default class CustomRouter {
  constructor() {
    this.router = Router(); //esto no es una clase. cuando lo ejecuto se crea un objeto Router
    this.init(); //ejecuto la funcion inicializadora de la instancia
  }
  getRouter() {
    //funcion q va a ser la encargada de retornar el enrutador. funcion q me devuelva todos los endpoints
    return this.router;
  }
  init() {} //funcion inicializadora de la instancia. esta se usa x ejemplo para extender la clase
  applyCbs(cbs) {
    // va a depender de todos los middlewaress y callbacks q necesite en endpoint.
    //cbs es un array de callbacks.  (x ej todos los middlewares q necesita el endpoint /api/sessions/signout)

    return cbs.map((each) => async (...params) => {
      //retorna un array de callbacks transformado. (params hace referencia a req, res y next)
      try {
        //esperar q cada uno de los middleware(callbacks) se aplique en este entorno con los valores q tengo
        await each.apply(this, params);
      } catch (error) {
        /*return*/ params[1].json({ statusCode: 500, message: error.message }); //(params[1] hace referencia a res)
        //req es params[0], res es params[1], next es params[2]
      }
    });
  }
  responses = (req, res, next) => {
    //va a depender de req, res y next
    // payload puede el array de productos, los datos del usuario, lo q se necesite enviar en caso de exito
    res.success200 = (payload) =>
      res.json({ statusCode: 200, response: payload }); //200:exito
    res.success201 = (payload) =>{
      console.log({payload})
      return res.json({ statusCode: 201, response: payload });
    }
    res.error400 = (message) =>
      res.json({ statusCode: 400, response: message }); //este no creo q aparezca, sino q el errorHandler seguro lo va a manejar
    //res.error401 = (message) => res.json({ statusCode: 401, response: message || "Bad auth!" }); //esta puede q aparezca
    res.error401 = (msg) => res.json({ statusCode: 401, response: "Bad auth!" }); //esta puede q aparezca
    res.error403 = () => res.json({ statusCode: 403, response: "Forbidden!" }); //esta puede q aparezca
    res.error404 = () => res.json({ statusCode: 404, response: "Not found!" }); //este no creo q aparezca, sino q el errorHandler seguro lo va a manejar
    return next(); //es necesario agregar esto para q siga a lo q sigue, sino, va a quedar trabado
  };

  policies = (arrayOfPolicies) => async (req, res, next) => {
    try {
      //estoy menajando middleware, x lo q depende de req,res y next para dejar pasar
      if (arrayOfPolicies.includes("PUBLIC")) return next();  //si es publico lo dejo pasar directamente
      let token = req.cookies["token"]; //obtengo el token
      if (!token) return res.error401(); //xq no esta autenticado
      else {
        const data = jwt.verify(token, process.env.SECRET); //lo desenctripto
        if (!data) return res.error400("Bad auth by token!"); //x ej si el token fue modificado, y si caducó
        else {
          const { email, role } = data;
          if (
            (role === 0 && arrayOfPolicies.includes("USER")) || //si el usuario tiene rol 0 y las politicas son q permiten los USER
            (role === 1 && arrayOfPolicies.includes("ADMIN")) ||
            (role === 2 && arrayOfPolicies.includes("PREMIUM"))
          ) {
            const user = await users.readByEmail(email);
            req.user = user; // si tiene permiso lo agrego al objeto de requerimientos
            return next();
          } else return res.error403();
        }
      }
    } catch (error) {
      next(error)
    }
  };

  //xq yo puedo tener cierto enpoint q solo lo puedan usar los admin y los premium

  //primer metodo del crud q vamos a crear. si queremos, lo podemos llamar post. el lo va a llamar create
  create(path, policies, ...cbs) {
    //operador rest (xq yo puedo tener varios middlewares, y el callback)
    //path: la ruta del enpoint, puede ser: /, /api, /events, /:pid
    //el segundo parametro son los middlewares
    this.router.post(path, this.responses, this.policies(policies), this.applyCbs(cbs)); //como quiero hacer q este sea un endpoint POST, uso la funcion post(). cbs viene de ...cbs
    //para q cada endpoint tenga acceso a esas respuestas, agrego: this.responses
  }

  read(path, policies, ...cbs) {
    //this.router.get(path, this.responses, this.policies([PUBLIC]), this.applyCbs(cbs)); //podria hardcodearla como publica pero lo correcto es pasarla como parametro
    this.router.get(path, this.responses, this.policies(policies), this.applyCbs(cbs));
  }
  update(path, policies, ...cbs) {
    this.router.put(path, this.responses, this.policies(policies), this.applyCbs(cbs));
  }
  destroy(path, policies, ...cbs) {
    this.router.delete(path, this.responses, this.policies(policies), this.applyCbs(cbs));
  }
  use(path, ...cbs) {  //en el use no es conveniente aplicar las politicas, xq es muy generico y podria dar problemas
    this.router.use(path, this.responses, this.applyCbs(cbs));
  }

  //hay una forma de agregar un tercer parametro, q va a indicar de cual de las funciones se trata, con lo cual reduciria
  //la cantidad de funciones q voy a usar
}
