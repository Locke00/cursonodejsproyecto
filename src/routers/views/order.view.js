;
import { verifytoken } from "../../utils/token.util.js";

import CustomRouter from "../CustomRouter.js";
//import { orders, users } from "../../data/mongo/manager.mongo.js";
import orders from "../../data/mongo/orders.mongo.js";
import users from "../../data/mongo/users.mongo.js";
//import passCallBack from "../../middlewares/passCallBack.mid.js";
import winstonLog from "../../utils/logger/index.js";

export default class OrdersViewRouter extends CustomRouter{
  init(){
    this.read("/",["USER","PREM","ADMIN"], async (req, res, next) => {
      try {
        const user = res.locals.user
        if (!user) {
          return res.redirect("/");
        }
        const options = {
          limit: req.query.limit || 10,
          page: req.query.page || 1,
          sort: { title: 1 },
          lean: true,
        };
        const filter = {
          //user_id: user._id,
          user_id: user._id.toString(),
        };
        const allBSON = await orders.read({ filter, options });
        const allBSONstr = JSON.stringify(allBSON);
        const all = JSON.parse(allBSONstr);  //queda el objeto en formato json
    
        //winstonLog.INFO(all.docs[0].product_id);
        return res.render("orders", { 
          title: "MY CiART",
          orders: all.docs,
        } ) ;
      } catch (error) {
        winstonLog.ERROR(error.message);
        return res.render("orders", {
          title: "MY wCART",
          message: "NO ORDERS YET!",
        });
      }
    });
    

  }


}




