//importar los modelos para luego ngenerar las instancias de
//las diferentes managers
import User from "./models/user.model.js";
import Product from "./models/product.model.js";
import Order from "./models/order.model.js";
import notFoundOne from "../../utils/notFoundOne.util.js";
import { Types } from "mongoose";
import winstonLog from "../../utils/logger/index.js";


class MongoManager {
  constructor(model) {
    this.model = model;
  }
  //los metodos estos todos son asincronos
  async create(data) {
    try {
      const one = await this.model.create(data); //asi obtengo el objeto
      //return one._id; //devuelvo el id
      return one;
    } catch (error) {
      throw error;
    }
  }


  
  // a este read le voy a poner un filtro y un ordenamiento, x eso le paso parametro)
  async read({ filter, options }) {
    try {
      //filter cno las consultas para el fitro
      //sort onel objeto para el ordenamiento

      //if (!filter) { filter = {} }    // para configurar el filtro x defecto
      //if (!order) { order = { name: 1 } }   // para configurar el orden x defecto

      //una forma:
      //const all = await this.model
      //  .find(filter,"-createdAt -updateAt -__v")    //si quisiera q quitar unos cambpos de la respuesta padre
      //  .sort(order)

      //otra forma:
      //const all = await this.model.find(filter)   // los populate los saco xq me va a dar error en los modelos q no son order. la forma de incoporar las referencias lo voy a hacer usando el middleware PRE, en order.model.js
      //  //.populate("user_id","-password -createdAt -updatedAt -__v")  // '-', para q esos campos no se agreguen
      //  //.populate("event_id","name planes price")   // para q esos campos si se agregen
      //  .sort(order);
      console.log({filter})
      console.log({options})
      const all = await this.model.paginate(filter, options);

      //winstonLog.INFO(JSON.stringify(all));
      //if (all.docs.lenght === 0) {
      if (all.totalPages === 0) {
        const error = new Error("There aren't documents");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }
  /*
  //este no filtra bien, la cantidad de elementos
  async read({ filter, options }) {
    try {
      const all = await this.model.paginate(filter, options);
      if (all.totalDocs === 0) {
        const error = new Error("There aren't any document");
        error.statusCode = 404;
        throw error;
      }
      return all;
    } catch (error) {
      throw error;
    }
  }*/


  async report(uid) {
    try {
      const report = await this.model.aggregate([
        //$match productos de un usuario en el carrito (las ordenes de un usuario)
        { $match: { user_id: new Types.ObjectId(uid) } },
        //$lookup para popular los eventos
        {
          $lookup: {
            from: "products", // la coleccion q tengo q popular
            foreignField: "_id", // es como la foreing key
            localField: "product_id", // propiedad q yo tengo q buscar en la coleccion eventos. es la q busco la coleccion "events"(from) con id "_id"(foreignField)
            as: "product_id", //este elemento es opcional. aqui indico como lo quiero traer
          },
        },
        //hace q los elementos del foreign tb esten en la raiz del elemento q esta referenciando (orders). para mergear el objeto con el objeto cero del array populado
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$product_id", 0] }, "$$ROOT"],
            },
          },
        },
        //agrega una propiedad q es producto de otras anteriores - para agregar la propiedad subtotal = price*quantity
        { $set: { subtotal: { $multiply: ["$price", "$quantity"] } } },
        //es un reduce q hace q queden unas propiedades. agrupa x adi, totaliza todos los subtotales - para agrupar por user_id y sumar los subtotales
        { $group: { _id: "$user_id", total: { $sum: "$subtotal" } } },
        //para limpiar el objeto (dejar sólo user_id, total y date). tb permite agregar propiedades
        {
          $project: {
            _id: 0,
            user_id: "$_id",
            total: "$total",
            date: new Date(),
            currency: "USD",
          },
        }, //_id:0, quito la propiedad _id, ya q no es la piedad de la order, es lo mismo q _id: false. ademas hago q la id sea user_id
        //$merge, es para crear un documento de la colección bills con la suma total
        //alternativamente puedo crear el objeto generado como si fuera un objeto, es cual es agregado en la colleccion bills (se crea si no existe)
        //{ $merge: { into: "bills" } }
      ]);
      return report;
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      const one = await this.model.findOne({ email });
      //notFoundOne(one);
          //la funcion de utilidad aca No la tengo q implementar debido a q:_
      //para el register necesito q retorne null en lugar de error
      //para el login necesito q retorne el usuario en lugar de un error
      return one;
    } catch (error) {
      throw error;
    }
  }


/*  async isuser(varEmail, varPassword) {
    try {
      const report = await this.model.aggregate([
        //$match productos de un usuario en el carrito (las ordenes de un usuario)
        { $match: { email: varEmail, password: varPassword } },
        { $replaceRoot: { newRoot: {$mergeObjects: [ {$arrayElemAt: ["$event_id",0]},"$$ROOT" ] } } },   
        //$lookup para popular los eventos
        { $project: { _id:1 } }
      ]);
      return report;
    } catch (error) {
      throw error;
    }
  }*/



  async readOne(id) {
    try {
      //el profe agregó el .lean(), pero no se para q si lo mismo funca
      if (!Types.ObjectId.isValid(id)) {
        const error = new Error("There isn't any documents");
        error.statusCode = 400; // Bad Request
        throw error;
      }
      const one = await this.model.findById(id).lean();//.lean();
      //winstonLog.INFO("--start--");
      //winstonLog.INFO(JSON.stringify(one));
      //winstonLog.INFO("--end--");
      //const one = await this.model.findById(id);
      //notFoundOne(one);
      if (!one) {
        const error = new Error("There isn't any documents");
        error.statusCode = 404;
        throw error;
      }
      return one;
    } catch (error) {
      throw error;
    }
  }
  async update(id, data) {
    try {
      const opt = { new: true };
      //este objeto de configuracion OPCIONAL devuelve el objeto LUEGO de la modificaicion
      const one = await this.model.findByIdAndUpdate(id, data, opt); // si no le paso el parametro opt, la funcion me devolveria el objeto antes de la modificacion
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }
  async destroy(id) {
    try {
      const one = await this.model.findByIdAndDelete(id);
      notFoundOne(one);
      return one;
    } catch (error) {
      throw error;
    }
  }

  //calcula estadisticas de tiempo y documentos filtrados
  async stats({ filter }) {
    try {
      let stats = await this.model.find(filter).explain("executionStats");
      winstonLog.INFO(JSON.stringify(stats));
      stats = {
        quantity: stats.executionStats.nReturned,   //devuelve la cantidad de registros q pasaron el filtro
        time: stats.executionStats.executionStatsMillis   //tiempo q demora
      };
      return stats;
    } catch (error) {
      throw error;
    }
  }
}

//const users = new MongoManager(User);
//const products = new MongoManager(Product);
//const orders = new MongoManager(Order);
//
//export { users, products, orders };

//alternativamente se puede hacer un export default del manager,
//pero lo mejor, es exportar las instanacias:
export default MongoManager;
