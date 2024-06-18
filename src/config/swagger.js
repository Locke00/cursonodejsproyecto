import __dirname from "../../utils.js";

const options = {
  definition: {       //primero le paso un objeto con las propiedades
    openapi: "3.0.1", //version actual del swagger
    info: {              //info del proyecto
      title: "Venta de Garage",
      description: "Documentation of API",
    },
  },
  apis: [`${__dirname}/src/docs/*.yaml`],   //con array con la ruta a donde se van a guardar todos los archivos yaml
};

export default options;
