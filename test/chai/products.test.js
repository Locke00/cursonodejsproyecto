import { expect } from "chai";
import env from "../../src/utils/env.util.js"   //esto es necesario 
      //para q dotenv capture el entorno
import "dotenv/config.js";

import dao from "../../src/data/index.factory.js";
const { products } = dao;


describe("Testeando Modelo Mascotas", () => {
  const model = products; //acá, instanaciando el manager de pet q viene del dao voy obtener 
                           //el modelo con todos los metodos para crear, para actualizar, etc
  const data = { title: "wiiX", photo: "https://http2.mlstatic.com/D_NQ_NP_2X_813569-MLA32731593369_112019-F.webp", price: 50000};
  let id;
  //luego agrego las unidades de testeo (it)
  it("La creación de un producto requiere un objeto con la propiedad 'title'", () => {
    expect(data).to.have.property("title");  //verifica q data tenga una propiedad llamada "title"
  });
  it("La creación de un producto no necesita un objeto con la propiedad 'stock'", () => {
    expect(data).not.to.have.property("stock");  //verifica q no tenga esa propiedad
  });
  it("La función creadora de un producto, devuelve un objeto", async () => {
    const one = await model.create(data);
    //expect(one).to.be.a("object");     //esta linea es equivalente a la de abajo
    console.log();
    expect(one).to.be.an("object");
  });


  it("La función creadora de un producto, devuelve un objeto con la propiedad '_id'", async () => {
    const one = await model.create(data);
    id = one._id;    // este id lo voy a usar en el test del update
    expect(one).to.have.property("_id");
  });
  it("La función para leer productos debe devolver un objeto con las propiedades 'prevPage', 'nextPage' y 'docs'", async () => {
    const options = {
      limit: 2,
      page: 2,
      sort: { title: 1 },
      lean: true
    };
    const filter = {};
    const all = await model.read({ filter, options });

    expect(all).to.have.property("prevPage");
    //.and.to.have.property("next")   //el profe no lo pudo hacer andar con el and
    //.and.to.have.property("pets");
    expect(all).to.have.property("nextPage");
    expect(all).to.have.property("docs");
  });
  it("La función para leer productos debe devolver un array de productos en la propiedad 'docs'", async () => {
    const all = await model.read({
      page: 2,
      skip: 2,
      limit: 2
    });
    expect(Array.isArray(all.docs)).to.be.equals(true);
  });
  it("La función para actualizar un producto debe devolver un producto actualizado", async () => {
    const before = await model.readOne(id);
    //before va a ser el objeto ANTES de la modificaicon
    const one = await model.update(id, { title: "wiiY" });
    expect(one.title).not.to.be.equals(before.title);
  });
  it("La función para eliminar un producto debe efectivamente eliminar una producto", async () => {
    await model.destroy(id);
    let after
    try {
      after = await model.readOne(id);  
    } catch (error) {
      if (error.statusCode == 404)   after = null
    }
    expect(after).to.be.equals(null);
  });
});