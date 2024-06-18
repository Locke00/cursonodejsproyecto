import crypto from "crypto";
import winstonLog from "../../utils/logger/index.js";

class UsersManager {
  static #users = [];
  constructor() {  }
  create(data) {
    try {

      if (!data.name || !data.email) {
        const error = new Error("name & email are required");
        error.statusCode = 400;
        throw error;
      }
      /*const user = {
        id: crypto.randomBytes(12).toString("hex"),
        name: data.name,
        email: data.email,
        photo: data.photo || "https://i.postimg.cc/wTgNFWhR/profile.png",
        password: data.password
      };*/
      UsersManager.#users.push(data);
      return data;
    } catch (data) {
      throw error;
    }
  }
  read({ filter, orderAndPaginate }) {
    try {
      if (UsersManager.#users.length === 0) {
        const error = new Error("NOT FOUND!");
        error.statusCode = 404;
        throw error;
      } else {
        return UsersManager.#users;
      }
    } catch (error) {
      throw error;
    }
  }

  async readByEmail(email) {
    try {
      return UsersManager.#users.find( user => user.email === email )
    } catch (error) {
      throw error
      
    }
  }


  readOne(id) {
    try {
      const one = UsersManager.#users.find((each) => each._id === id);
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
  async update(uid, data) {
    try {
      const one = await this.readOne(uid);
      if (one) {
        for (let each in data) {
          one[each] = data[each];
        }
      }
      return one;
    } catch (error) {
      throw error;
    }
  }

  /*  //otra forma de update
  update(id, data) {
    try {
      const index = UsersManager.#users.findIndex((user) => user.id === id);

      if (index === -1) {
        throw new Error(`User with ID ${id} not found`);
      }

      UsersManager.#users[index] = {
        ...UsersManager.#users[index],
        ...data,
      };

      winstonLog.INFO(`User with ID ${id} updated successfully`);
      return UsersManager.#users[index];
    } catch (error) {
      console.error(error.message);
      return error.message;
    }
  }
*/

  destroy(id) {
    try {
      const one = UsersManager.#users.find((each) => each._id === id);
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


/*  destroy(id) {
    return UsersManager.users.filter( (elemento)=>{
      return elemento.id !== id
    })
  }

}*/

}


const users = new UsersManager();

//users.create(1, "Juan", "http://www.casa.com/juan.jpg", "juan@gmail.com");
users.create({
  _id: "db889698baf56482c414757f",
  name: "Juan",
  photo: "http://www.casa.com/juan.jpg",
  email: "admin@gmail.com",
  password: "$2b$10$7FfrKQs7Dxd5/HBXRC39ee3GRjXDExHxjfy1dILHHxannxr4RbNla",
  role: 1
});
users.create({
  _id: "db889698baf51234c414757f",
  name: "Pedro",
  photo: "http://www.casa.com/pedro.jpg",
  email: "user@gmail.com",
  password: "$2b$10$2w0BN0Nw2TWDgJ/4MZnrceq6UbfXIRpt.8DV1AlAcB1UxVmRpONRe"

});
users.create({
  _id: "dbasdfasdf8baf51234c414757f",
  name: "Lucas",
  photo: "http://www.casa.com/lucas.jpg",
  email: "prem@gmail.com",
  password: "$2b$10$7FfrKQs7Dxd5/HBXRC39ee3GRjXDExHxjfy1dILHHxannxr4RbNla"
});

//winstonLog.INFO("Output of users.read():  ");
//winstonLog.INFO(JSON.stringify(users.destroy(2)));
//winstonLog.INFO(JSON.stringify(users.read()));
//winstonLog.INFO("Output of users.readOne(2):  ");
//winstonLog.INFO(JSON.stringify(users.readOne(2)));



//const users = new UsersManager();
export default users;