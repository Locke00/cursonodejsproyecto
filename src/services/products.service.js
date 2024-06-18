//import products from "../data/mongo/manager.mongo.js";
//import dao from "../data/index.factory.js";
//const { products } = dao
import repository from "../repositories/products.rep.js";
//import ProductDTO from "../dto/product.dto.js";
//import winstonLog from "../utils/logger/index.js";


class ProductsService {
  constructor() {
    this.repository = repository;
  }
  create = async (data) => {
    try {
      //data = new ProductDTO(data)
      const response = await this.repository.create(data);
      return response;
    } catch (error) {
      //error.statusCode = xxx 
      throw error;  //aqui no tengo para hacer next, asiq hago throw
    }
  };
  read = async ({ filter, options }) => {
    try {
      //winstonLog.INFO(JSON.stringify(this.repository));
      const response = await this.repository.read({ filter, options });
      return response;
    } catch (error) {
      throw error;
    }
  };
  readOne = async (id) => {
    try {
      const response = await this.repository.readOne(id);
      return response;
    } catch (error) {
      throw error;
    }
  };
  update = async (id, data) => {
    try {
      const response = await this.repository.update(id, data);
      return response;
    } catch (error) {
      throw error;
    }
  };
  destroy = async (id) => {
    try {
      const response = await this.repository.destroy(id);
      return response;
    } catch (error) {
      throw error;
    }
  };
}

const service = new ProductsService();
export default service;
