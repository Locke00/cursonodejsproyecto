import CustomRouter from "../CustomRouter.js";
//import orders from "../../data/fs/orders.fs.manager.js"
//import { orders } from "../../data/mongo/manager.mongo.js"; //importo el manager de ordenes


import {
  create,
  read,
  report,
  readOne,
  update,
  destroy,
} from "../../controllers/orders.controller.js";


class OrdersRouter extends CustomRouter {
  init(){//aca defino los endpoint (post, get, put, delete)
    this.create("/",["USER","PREM","ADMIN"], create)
    this.read("/",["PUBLIC"], read)
    this.read("/total/:uid",["PUBLIC"], report)
    this.read("/:oid",["PUBLIC"], readOne)
    this.update("/:oid",["USER","PREM","ADMIN"], update);
    this.destroy("/:oid",["USER","PREM","ADMIN"], destroy)
  }


}

const ordersRouter = new OrdersRouter();
export default ordersRouter.getRouter();




/*
this.read("/:uid", async(req, res, next)=>{
  try {
    // uid = uid.trim();
    //const filter = { user_id: uid }
    //const all = await orders.read({ filter })
    //return res.success200(all)
    let filter = {}    
    if (req.params.uid) {
      let { uid } = req.params
      uid = uid.toString().trim();
      filter.user_id = uid;
    }

    const all = await orders.read({ filter })
    return res.success200(all)

  } catch (error) {
    throw error
  }

})
*/