

//const fs = require("fs");  //old syntaxis
import fs from 'fs';      //new syntaxis
import winstonLog from "../../utils/logger/index.js";

//const crypto = require("crypto"); old
//import crypto from "crypto"


//const ruta = "./sprints/sprint2/fs/data/products.fs.json";
//const configuracion = "utf-8";
//let nextId;
//let productsArray,nextId,productsFs,producto

class ProductsManager {
  static #products = []
  init() {
    try {
      const exists = fs.existsSync(this.path);
      if (!exists) {
        const data = JSON.stringify([], null, 2);
        fs.writeFileSync(this.path, data);
      } else {
        ProductsManager.#products = JSON.parse(fs.readFileSync(this.path, "utf-8"));
      }
    } catch (error) {
      return error;
    }
  }

  constructor(path) {
    this.path = path;
    //ProductsManager.#products = [];
    this.init();
  }
  async create(data) {
    try { 
      if (!data.title) {
        throw new Error("title is required");
      }
      //      nextId = productsArray.length+1
      //nextId = 1;

/*      const product = {
        id: crypto.randomBytes(12).toString("hex"),
        title: data.title,
        photo: data.photo,
        price: data.price,
        stock: data.stock,
      };*/
      ProductsManager.#products.push(data);
      const jsonData = JSON.stringify(ProductsManager.#products, null, 2);

      await fs.promises.writeFile(this.path, jsonData); //all poner await, debo poner async a la funcion donde esta esta instruccion
      //winstonLog.INFO(product.id);
      return data;
    } catch (error) {
      winstonLog.ERROR(error.message);
      return error.message;
    }
  }
  read() {
    try {
      if (ProductsManager.#products.length === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404
        throw error
      } else {
     //winstonLog.INFO(ProductsManager.#products);
        return ProductsManager.#products;
      }
    } catch (error) {
      winstonLog.ERROR(error.message);
      return error.message;
    }
  }
  readOne(id) {
    try {
      const one = ProductsManager.#products.find((each) => each._id === id);
      if (!one) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404
        throw error
      } else {
        winstonLog.INFO(JSON.stringify(one));
        return one;
      }
    } catch (error) {
      winstonLog.ERROR(error.message);
      return error.message;
    }
  }
  async destroy(id) {
    try {
      const one = ProductsManager.#products.find((each)=> each._id === id)
      if (one) {
        ProductsManager.#products = ProductsManager.#products.filter(
          (each)=>each._id !== one._id
        );
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(ProductsManager.#products, null, 2)
        )
        winstonLog.INFO("Destroy ID: "+id);
        return one;
      } else {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404
        throw error
      }
    } catch (error){
      winstonLog.ERROR(error.message);
      return error.message
    }
  }

  async update(id, data) {
    try {
      const productIndex = ProductsManager.#products.findIndex((product) => product._id === id);

      if (productIndex === -1) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404
        throw error
      }
      const updatedProduct = {
        ...ProductsManager.#products[productIndex],
        ...data,
        _id: ProductsManager.#products[productIndex]._id, // Mantener el mismo ID
      };

      ProductsManager.#products[productIndex] = updatedProduct;

      await fs.promises.writeFile(this.path, JSON.stringify(ProductsManager.#products, null, 2));

      winstonLog.INFO("Product updated successfully");
      return updatedProduct;
    } catch (error) {
      winstonLog.ERROR(error.message);
      return error.message;
    }
  }



}

const products = new ProductsManager("./src/data/fs/files/products.fs.json");
export default products


//winstonLog.INFO(JSON.stringify(products.read()));
/*products.create({
  title: "casa",
  photo: "http://www.multimarcas.com/casa.jpg",
  price: 3000,
  stock: 5,
});

products.create({
  title: "auto",
  photo: "http://www.multimarcas.com/auto.jpg",
  price: 1000,
  stock: 5,
});
products.create({
  title: "moto",
  photo: "http://www.multimarcas.com/auto.jpg",
  price: 500,
  stock: 5,
});
*/

//winstonLog.INFO(JSON.stringify(products.read()));
//winstonLog.INFO(JSON.stringify(products.readOne("2464fa95246cbd5050e3a466")));
//await products.read();
//await products.readOne("4a9d62ebb7c4ac575cede2ab");
//await products.destroy("4a9d62ebb7c4ac575cede2ab");
//await products.readOne("4a9d62ebb7c4ac575cede2ab");

//winstonLog.INFO(JSON.stringify(products.destroy("8f2f1521de5e417e989f98cf")));
