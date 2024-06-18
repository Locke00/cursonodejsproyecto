import CustomRouter from "../CustomRouter.js";
//import { Router } from "express";


//import sessionsRouter from "./sessions.router.api.js";
import usersRouter from "./users.router.api.js"
import productsRouter from "./products.router.api.js";
import sessionsRouter from "./sessions.router.api.js";

import ordersRouter from "./orders.router.api.js";
import loggersRouter from "./loggers.router.api.js";




//const apiRouter = Router()


export default class ApiRouter extends CustomRouter {
  init(){
    this.use("/users",usersRouter)
    this.use("/products",productsRouter)
    this.use("/orders",ordersRouter)
    this.use("/sessions",sessionsRouter)
    this.use("/loggers",loggersRouter)

  }


}


//definir los enrutadores de los recursos
//apiRouter.use("/users",user.getRouter())
//apiRouter.use("/products",productsRouter)
//apiRouter.use("/orders",ordersRouter)
//apiRouter.use("/sessions",sessionsRouter)


//export default apiRouter
//exporto elenrutador de la api para poder implementarlo en el enrutador del servidor  