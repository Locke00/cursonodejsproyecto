//import "dotenv/config.js";
import { faker } from "@faker-js/faker";
import repository from "../../repositories/products.rep.js";
//import dbConnection from "../../utils/dbConnection.util.js";
//import dbUtils from "../../utils/db.utils.js";
import winstonLog from "../../utils/logger/index.js";



export default function productsMock() {
  return {
    title: faker.commerce.productName(),
    photo: faker.image.urlPicsumPhotos(),
    price: (faker.number.int(100))*100,
    stock: faker.number.int(100)
  };
}

async function createMocks() {
  try {
    const data = productsMock();
    winstonLog.INFO(JSON.stringify(data));
    await repository.create(data); 
    //const product = await repository.create(data); //obtengo la info del usuario creado
    //for (let i=1; i<=10; i++) {
    //  await createNote(user.id)  //y, usando su id, creo 10 notas asociadas a ese usuario
    //}
    //winstonLog.INFO("USER CREATED!");
  } catch (error) {
    winstonLog.ERROR(error.message);
  }
}


for (let i=1; i<=99; i++) {
  createMocks();                //creo 10 productos
}
winstonLog.INFO("DATA MOCKED!");

