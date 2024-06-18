import notFoundOne from "../../utils/notFoundOne.util.js";
import winstonLog from "../../utils/logger/index.js";

class OrdersManager {
  static #orders = [];
  constructor() {}
  create(data) {
    try {
      OrdersManager.#orders.push(data);
      return data
    } catch (error) {
      throw error
      
    }
  }
  read() {
    try {
      if (OrdersManager.#orders.length === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return OrdersManager.#orders;
      }
       
    } catch (error) {
      throw error;
    }
  } 
    
  readOne(id) {
    try {
      const one = OrdersManager.#orders.find((each) => each._id === id);
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
  /*destroy(id) {
    try {
      const one = OrdersManager.#orders.find((each) => each._id === id);
      if (one) {
        OrdersManager.#orders = OrdersManager.#orders.filter(
          (each) => each.id !== id
        );
        winstonLog.INFO("Destroyed ID:" + id);
        return id;
      } else {
        throw new Error("there isnt product with ID" + id);
      }
    } catch (error) {}
    winstonLog.ERROR(error.message);
    return error.message;
  }*/

  async destroy(id) {
    try {
      const one = this.readOne(id);
      notFoundOne(one)
      OrdersManager.#orders = OrdersManager.#orders.filter(
        (each) => each._id !== id
      );
      return one;
    } catch (error) {
      throw error;
    }
  }

  update(id, data) {
    try {
      const index = OrdersManager.#orders.findIndex((order) => order._id === id);

      if (index === -1) {
        throw new Error(`Order with ID ${id} not found`);
      }

      OrdersManager.#orders[index] = {
        ...OrdersManager.#orders[index],
        ...data,
      };

      winstonLog.INFO(`Order with ID ${id} updated successfully`);
      return OrdersManager.#orders[index];
    } catch (error) {
      //console.error(error.message);
      throw error
    }
  }
}

const orders = new OrdersManager();

orders.create({
  pid: "p1111",
  uid: "u1111",
  quantity: 5,
  state: "encargado",
});
orders.create({
  pid: "p2222",
  uid: "u2222",
  quantity: 8,
  state: "vendido",
});
orders.create({
  pid: "p3333",
  uid: "u3333",
  quantity: 2,
  state: "reservado",
});

winstonLog.INFO(JSON.stringify(orders.read()));
export default orders;


//winstonLog.INFO("Output of products.read():  ");
//winstonLog.INFO(JSON.stringify(products.destroy(2)));
//winstonLog.INFO(JSON.stringify(users.read()));
//winstonLog.INFO("Output of products.read(2):  ");
//winstonLog.INFO(JSON.stringify(users.readOne(2)));





