import service from "../services/users.service.js";

class UsersController {
  constructor() {
    this.service = service;
    
  }
  create = async (req, res, next) => {
    try {
      const data = req.body;
      const response = await this.service.create(data);
      return res.success201(response);
    } catch (error) {
      return next(error);
    }
  };
  read = async (req, res, next) => {
    try {
      const options = {
        limit: req.query.limit || 20,       //q cada pagina tenga 20 documentos
        page: req.query.page || 1,   //q arranque x defecto en la pagina 1
        sort: { title: 1 }, //q lo ordene x nombre   (si quisiera ordenar x email: sort: { name: 1 })
        lean: true,
      };
      const filter = {};
      if (req.query.email) {
        //filter.email = req.query.email
        filter.email = new RegExp(req.query.email.trim(), "i");  //el trim es para quitar los espacios de adelante y de atrás
        //al usar la expresion regular, permito q lo q pase x parametro en la url get, como email, no lo tome estrictamente
        //sino q me devuelva los q email q tengan dentro lo q le pasé como parámetro. x ej, si paso: http://localhost:8080/api/users?email=quito
        //va a devolver los usuarios q tengan como email: "email": "marquitos2435679231@gmail.com", "email": "marquitos24356792341@gmail.com", etc
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
  stats = async (req, res, next) => {
    try {
      const id = req.user._id;
      const all = await this.service.stats(id);
      return res.success200(all);
    } catch (error) {
      return next(error);
    }
  };
  readOne = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const one = await this.service.readOne(uid);
      //winstonLog.INFO(JSON.stringify(one));
      return res.success200(one);
    } catch (error) {
      return next(error);
    }
  };
  update = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const data = req.body;
      const response = await this.service.update(uid, data);
      return res.success200(response);
    } catch (error) {
      return next(error); //indica q lo dejo pasar al middleware de errores
    }
  };
  destroy = async (req, res, next) => {
    try {
      const { uid } = req.params;
      const response = await this.service.destroy(uid);
      return res.success200(response);
    } catch (error) {
      return next(error);
    }
  };
}

export default UsersController;
const controller = new UsersController();
const { create, read, stats, readOne, update, destroy } = controller;
export { create, read, stats, readOne, update, destroy };



/*usersRouter.get("/", async (req, res, next) => {
  try {

    const filter = {}
    if (req.query.email) {
      //filter.email = req.query.email
      filter.email = new RegExp(req.query.email.trim(),'i')   //el trim es para quitar los espacios de adelante y de atrás
      //al usar la expresion regular, permito q lo q pase x parametro en la url get, como email, no lo tome estrictamente
      //sino q me devuelva los q email q tengan dentro lo q le pasé como parámetro. x ej, si paso: http://localhost:8080/api/users?email=quito
      //va a devolver los usuarios q tengan como email: "email": "marquitos2435679231@gmail.com", "email": "marquitos24356792341@gmail.com", etc
    }

    // vamos a hacer una ordenacion y paginacion x defecto:
    const orderAndPaginate = {
      limit: req.query.limit || 5,       //q cada pagina tenga 20 documentos
      page: req.query.page || 1,         //q arranque x defecto en la pagina 1
      //sort: { name: 1 }    //q lo ordene x nombre   (si quisiera ordenar x email: sort: { name: 1 })
    }

    //if (req.query.name==="asc") {
    //  orderAndPaginate.sort.name = 1
    //} else {
    //  orderAndPaginate.sort.name = -1
    //}

    if (req.query.name==="desc") {        //estos considionales son necesarios para cuando hay q poner en particuplar 
      orderAndPaginate.sort.name = -1
    }

    const all = await users.read({filter, orderAndPaginate}); // se le manda un objeto vacio salvo q le agreguemos un filtro y el sort
    return res.json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

*/