import repository from "../repositories/users.rep.js";
//import UserDTO from "../dto/user.dto.js";
import sendEmail from "../utils/sendEmail.utils.js";
import winstonLog from "../utils/logger/index.js";

/*import dao from "../data/index.factory.js"
const {users} = dao
const repository = users*/

class UsersService {
  constructor() {
    this.repository = repository;
  }
  create = async (data) => {
    //data = new UserDTO(data);
    winstonLog.INFO(JSON.stringify(data));
    const response = await this.repository.create(data);
    return response;
  }
  read = async ({ filter, options }) =>
    await this.repository.read({ filter, options });
  stats = async (id) => await this.repository.stats(id);
  readOne = async (id) => await this.repository.readOne(id);
  readByEmail = async (email) => await this.repository.readByEmail(email);
  update = async (id,data) => await this.repository.update(id, data);
  destroy = async (id) => await this.repository.destroy(id);
  register = async(data) => {  //en data viene el mail y la contraseña
    try {
      return await sendEmail(data)
      
    } catch (error) {
      throw error
    }
  }
}

const service = new UsersService();
export default service;
