
//import products from "../../data/fs/product.fs.manager.js"
import products from "../../data/mongo/manager.mongo.js";


import CustomRouter from "../CustomRouter.js";
//import passport from "passport";
//import passCallBackMid from "../../middlewares/passCallBack.mid.js";

import {
  create,
  read,
  readOne,
  update,
  destroy,
} from "../../controllers/products.controller.js";

class ProductsRouter extends CustomRouter {
  init(){
    //aca defino los endpoint (post, get, put, delete)
    this.create("/", ["ADMIN","PREM"], create)
    this.read("/",["PUBLIC"], read)
    this.read("/:pid",["PUBLIC"],readOne)
    this.update("/:pid",["PREM","ADMIN"],update)
    this.destroy("/:pid",["PREM","ADMIN"],destroy)
  }
}

const productsRouter = new ProductsRouter()
export default productsRouter.getRouter()




