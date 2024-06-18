import winstonLog from "../utils/logger/index.js";
import service from "../services/products.service.js"

//import { events } from "../data/mongo/manager.mongo.js";

class ProductsController {
  //constructor(mode) {   //forma q se podria usar para reutirlizar
  //  this.model = model
  //}
  constructor() {
    //this.model = events  // en model vamos a poner la persistencia(q va a ser el manager de eventos)
    this.service = service;
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.service.create(data);  
                      //y eso no puede ser, x lo q vamos a actualizarlo dsp
      //const response = await this.service.create(data);
      return res.success201(response);
    } catch (error) {
      return next(error);
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
      if (req.query.title) {
        filter.title = new RegExp(req.query.title.trim(), "i");
      }
      if (req.query.sort === "desc") {
        options.sort.title = "desc";
      }
      const all = await this.service.read({ filter, options });
      //return res.json({ statusCode: 200, response: all });
      return res.success200(all);

      //la alternativa q habia hecho yo:
      //const order = { order: req.query.order }         //{ order: undefined }  !== {}  //no es lo mismo
      ////recordar q las consultas o queris SON OPCIONALES. Condicionar correctamente
      //const all = await events.read({ filter , order });
      //return res.json({
      //  statusCode: 200,
      //  response: all,
      //});
    } catch (error) {
      return next(error);
    }
  }
  readOne = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const one = await this.service.readOne(pid);
      winstonLog.INFO(JSON.stringify(one))
      return res.success200(one);
    } catch (error) {
      return next(error);  //indica q lo dejo pasar al middleware de errores
    }
  }
  update = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const data = req.body;
      const response = await this.service.update(pid, data);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
  destroy = async (req, res, next) => {
    try {
      const { pid } = req.params;
      const response = await this.service.destroy(pid);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
}

export default ProductsController;
const controller = new ProductsController();

//const create = controller.create
//const read = controller.read
//const readOne = controller.readOne
//const update = controller.update
//const destroy = controller.destroy
const { create, read, readOne, update, destroy } = controller;
export { create, read, readOne, update, destroy }   //exporto el objeto create solo

//export { create, read, readOne, update, destroy };
