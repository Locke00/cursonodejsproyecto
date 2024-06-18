import notFoundOne from "../../utils/notFoundOne.util.js";
import winstonLog from "../../utils/logger/index.js";

class ProductsManager {
  static #products = [];
  constructor() {}
  create(data) {
    /*const product = {
      id:
        ProductsManager.#products.length === 0
          ? 1
          : ProductsManager.#products[ProductsManager.#products.length - 1].id +
            1,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
    };*/
    try {
      ProductsManager.#products.push(data);
      return data
      
    } catch (error) {
      throw error
      
    }
    
  }
  read() {
    try {
      if (ProductsManager.#products.length === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return ProductsManager.#products;
      }
    } catch (error) {
      throw error;
    }

  }
  readOne(id) {
    try {
      const one = ProductsManager.#products.find((each) => each._id === id);
      if (!one) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return one;
      }
    } catch (error) {
      throw error;
    }

    
  }

  async destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one)
      ProductsManager.#products = ProductsManager.#products.filter(
        (each) => each._id !== id
      );
      return one;
    } catch (error) {
      throw error;
    }
  }



/*  destroy(id) {
    try {
      const one = ProductsManager.#products.find((each) => each._id === id);
      if (one) {
        ProductsManager.#products = ProductsManager.#products.filter(
          (each) => each.id !== id
        );
        winstonLog.INFO("Destroyed ID:" + id);
        return one;
      } else {
        throw new Error("NOT FOUND!");
      }
    } catch (error) {
      //winstonLog.ERROR(error.message);
      throw new Error()
    }
  }*/

  update(id, data) {
    try {
      const index = ProductsManager.#products.findIndex(
        (product) => product._id === id
      );

      if (index === -1) {
        throw new Error(`Product with ID ${id} not found`);
      }

      ProductsManager.#products[index] = {
        ...ProductsManager.#products[index],
        ...data,
      };

      winstonLog.INFO(`Product with ID ${id} updated successfully`);
      
      return ProductsManager.#products[index];
    } catch (error) {
      //console.error(error.message);
      //return error.message;
      throw error
    }
  }

}

const products = new ProductsManager();

products.create({
  _id: "2134123412351234123412342344563456345",
  title: "casa",
  photo: "http://www.multimarcas.com/casa.jpg",
  price: 3000,
  stock: 5,
});
products.create({
  _id: "2134123412351234123412342323412342344",
  title: "auto",
  photo: "http://www.multimarcas.com/auto.jpg",
  price: 1000,
  stock: 5,
});
products.create({
  _id: "2134123412351234123423452323412342344",
  title: "moto",
  photo: "http://www.multimarcas.com/auto.jpg",
  price: 500,
  stock: 5,
});
products.create({
  _id: "2134123412512345123434352323412342344",
  title: "bici",
  photo: "http://www.multimarcas.com/auto.jpg",
  price: 500,
  stock: 5,
});

//winstonLog.INFO("Output of products.read():  ");
//winstonLog.INFO(JSON.stringify(products.destroy(2)));
//winstonLog.INFO(JSON.stringify(products.read()));
//winstonLog.INFO("Output of products.readOne(2):  ");
//winstonLog.INFO(JSON.stringify(products.readOne(2)));

export default products;
