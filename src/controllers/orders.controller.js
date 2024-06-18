import service from "../services/orders.service.js";
import winstonLog from "../utils/logger/index.js";

class OrdersController {
  constructor() {
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;  //los parametros se pueden enviar x body, params o query,. 
                    //cuando creo algo, x lo general se envia x body
      data.user_id = req.user._id;
      winstonLog.INFO(JSON.stringify(data))
      const response = await this.service.create(data);
      return res.success201(response);
    } catch (error) {
      return next(error);  //indica q lo dejo pasar al middleware de errores
    }
  };
  read = async (req, res, next) => {
    try {
      const options = {
        limit: req.query.limit || 20,
        page: req.query.page || 1,
        sort: { title: 1 },
        lean: true,
      };
      const filter = {};
      if (req.user && req.user._id) { //estaba como if (req.user._id) {
        filter.user_id = req.user._id;
      }
      if (req.query.sort === "desc") {
        options.sort.title = "desc";
      }
      const all = await this.service.read({ filter, options });
      return res.success200(all);
    } catch (error) {
      return next(error);
    }
  };

  report = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const report = await this.service.report(uid);
      return res.success200(report)
    } catch (error) {
      return next(error);
    }
  }
  
  readOne = async (req,res,next)=>{
    try {
      winstonLog.INFO(req.params)
      const { oid } = req.params;
      const one = await this.service.readOne(oid);
      return res.success200(one)
    } catch (error) {
      return next(error)  //indica q lo dejo pasar al middleware de errores
    }
  }



  update = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const data = req.body;
      const response = await this.service.update(oid, data);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
  destroy = async (req, res, next) => {
    try {
      const { oid } = req.params;
      const response = await this.service.destroy(oid);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
}

export default OrdersController;
const controller = new OrdersController();
const { create, read, report, readOne, update, destroy } = controller;
export { create, read, report, readOne, update, destroy };
