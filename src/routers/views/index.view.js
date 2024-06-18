
//import {BSON} = require('bson')
//import { Router } from "express";
//import productsManager from "../../data/fs/products.fs.manager.js";
import products from "../../data/mongo/products.mongo.js";

//import registerRouter from "./register.view.js";
import formRouter from "./form.view.js";

import orderRouter from "./order.view.js";
import CustomRouter from "../CustomRouter.js";

import SessionsViewRouter from "./sessions.view.js";
import OrdersViewRouter from "./order.view.js";
//import winstonLog from "../../utils/logger/index.js";



const sessionsView = new SessionsViewRouter()
const ordersView = new OrdersViewRouter()



export default class ViewsRouter extends CustomRouter {
  init(){
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      //tengo q agregar el parametro next, para reenviarlo, para usar el errorHandler
      try {
        const filter = {};
        const orderAndPaginate = {
          limit: req.query.limit || 4, //q cada pagina tenga 20 documentos
          page: parseInt(req.query.page, 10) || 2, //q arranque x defecto en la pagina 1
        };
        //if (req.query.title === "desc") {
        //  //estos considionales son necesarios para cuando hay q poner en particuplar
        //  orderAndPaginate.sort.title = -1;
        //}
        if (req.query.title) {
          filter.title = new RegExp(req.query.title.trim(), "i");
        }
        if (req.query.sort === "desc") {
          options.sort.title = "desc";
        }
    
        const allBSON = await products.read({ filter, options: orderAndPaginate }); // se le manda un objeto vacio salvo q le agreguemos un filtro y el sort
    
        const allBSONstr = JSON.stringify(allBSON);
        const all = JSON.parse(allBSONstr);  //queda el objeto en formato json
        //winstonLog.INFO(JSON.stringify(all));
        return res.render("index", {
          listaProductos: all.docs,
          next: all.nextPage,
          prev: all.prevPage,
          title: "INDEX",
          filter: req.query.title,
        });
    
        
        //este bloque lo reemplazo
        //    const listaProductosString = JSON.stringify(all.docs);
        //    const listaProductos = JSON.parse(listaProductosString);
        //
        //    //const listaProductos2 = Array.from(listaProductos)
        //
        //    const date = new Date();
        //    //winstonLog.INFO(JSON.stringify(products));
        //    return res.render("index", { listaProductos, date }); //devuelvo la vista q tengo q renderizar
        //    // el 1er parametro es la vista, dsp va un objeto vacio
    
    
    
    
      } catch (error) {
        next(error); // en el catch tengo q poner next(error), para q sea manejado x el errorHandler
      }
    });
    
    this.read("/real",["PUBLIC"], (req, res, next) => {
      try {
        return res.render("real", { title: "REAL" });
      } catch (error) {
        next(error);
      }
    });
    
    //viewsRouter.use("/auth/register", registerRouter);
    this.read("/products/form",["USER","PREM","ADMIN"], (req, res, next) => {
      try {
        return res.render("form", { title: "Form" });
      } catch (error) {
        next(error);
      }
    });
    
    this.use("/auth", sessionsView.getRouter());
    
    
    this.use("/orders", ordersView.getRouter());
    

  }

}  

/*
export default class ViewsRouter extends CustomRouter {
  init() {
    this.read("/", ["PUBLIC"], async (req, res, next) => {
      try {
        return res.render("index", {
          title: "INDEX",
        });
      } catch (error) {
        next(error);
      }
    });
  }
}
*/

/*

const viewsRouter = Router();



//viewsRouter.get("/orders", (req, res, next) => {
//  try {
//    return res.render("orders", { title: "Orders" });
//  } catch (error) {
//    next(error);
//  }
//});


export default viewsRouter;
*/