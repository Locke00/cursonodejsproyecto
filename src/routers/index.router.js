

//import { Router } from "express"; //reemplazamos esta linea x la de abajo ya q usaremos CustomRouter
import CustomRouter from "./CustomRouter.js";

//import apiRouter from "./api/index.router.api.js"
import ApiRouter from "./api/index.router.api.js"
import ViewsRouter from "./views/index.view.js" //en mayuscula xq es la clase


//api es una instancia de la clase
const api = new ApiRouter()  //api es una instancia de la clase
const apiRouter = api.getRouter()  // devuelve en enroutador de la api


//const viewsRouter = Router();  //<-- cambiar a instancia de clase
const views = new ViewsRouter()
const viewsRouter = views.getRouter()



//const router = Router()
export default class IndexRouter extends CustomRouter {
  init(){
    //alternativamente: this.router.use("/api", api.getRouter()), para ahorrarme pasos, 
        //entonces ya no tendria q cargar la linea de arriba: apiRouter=api.getRouter()
    this.use("/api", apiRouter)   //apiRouter y viewsRouter en minuscula
    this.use("/", viewsRouter)
    
  }
}
//router.use("/api",apiRouter)
//router.use("/",viewsRouter)
//export default router