import assert from "assert";  //assert es nativo de nodejs
import env from "../../src/utils/env.util.js"   //esto es necesario 
      //para q dotenv capture el entorno
import "dotenv/config.js";    //traigo las variales de entorno xq las necesita factory(para saber la persistencia)
                              //y para las credenciale q necesita mongo

//console.log('DB_LINK:', process.env.DB_LINK);
import dao from "../../src/data/index.factory.js";
const { products } = dao;


//el 1do parametro de describe es un texto descriptivo
//el 2do parametro de describe es un a callback q va a ejecutar cada uno de los tests
describe("Testeando Modelo Mascotas", () => {
  const model = products; //acá, instanaciando el manager de pet q viene del dao voy obtener 
                           //el modelo con todos los metodos para crear, para actualizar, etc
  const data = { title: "wiiX", photo: "https://http2.mlstatic.com/D_NQ_NP_2X_813569-MLA32731593369_112019-F.webp", price: 50000};
  let id;
  //it: 1er parametro: descripcion
  //    2do parametro: callback q va a ejecutar la prueba
  //este test va a chequear si como parametro, se esta enviando la propiedad name
  it("La creación de un producto requiere un objeto con la propiedad 'title'", () => {
    assert.ok(data.title);     //assert.ok() permite verificar si existe una propiedad
  });
  it("La creación de un producto no necesita un objeto con la propiedad 'stock'", () => {
    assert.strictEqual(data.stock, undefined);  // si es q son iguales lo pasa al test
  });
  //console.log('---data:---');
  //console.log(data);
  it("La función creadora de un producto, devuelve un objeto", async () => {
    const one = await model.create(data);     //aqui crea un objeto en la base de datos
    //console.log('---one:---');
    assert.strictEqual(typeof one, "object");
  });
  
  it("La función creadora de un producto, devuelve un objeto con la propiedad '_id'", async () => {
    const one = await model.create(data);
    //id tiene q haber sido declarado anteriormente
    id = one._id;     //este id lo voy a necesitar para testear el update
    assert.ok(one._id);
  });

  it("La función para leer productos debe devolver un objeto con las propiedades 'prevPage', 'nextPage' y 'docs'", async () => {
    const options = {
      limit: 2,
      page: 2,
      sort: { title: 1 },
      lean: true
    };
    const filter = {};
    //options.sort.title = "desc";
    
    

    //read = async ({ filter, options }) =>
    //await this.model.read({ filter, options });
    
    
    const all = await model.read({ filter, options });
    
    //assert.strictEqual(all.prev);  //este mejor no, porque puede devolverlo, aunq su valor sea null
    assert.ok(all.prevPage);
    assert.ok(all.nextPage);
    assert.ok(all.docs);
    //NO SE RECOMIENDA TENER MAS DE UN ASSERT POR CADA UNIDAD DE TESTING "IT"
    //en realidad a esto lo tendría q haber separado en 3 tests its
  });
  it("La función para leer productos debe devolver un array de productos en la propiedad 'docs'", async () => {
    const all = await model.read({
      page: 2,
      skip: 2,
      limit: 2,
    });
    assert.strictEqual(Array.isArray(all.docs), true); // chequeamos si devuelve un array. 
                                                       //Array.isArray() devuelve un bool
  });
  
  
  it("La función para actualizar un producto debe devolver un producto actualizado", async () => {
    const before = await model.readOne(id);
    //before va a ser el objeto ANTES de la modificaicon
    const one = await model.update(id, { title: "wiiY" });
    //one va a ser el objeto LUEGO de la modificacion
    assert.strictEqual(before.title !== one.title, true);  //verifico si el valor de la propiedad es distinto
  });
  
  it("La función para eliminar un producto debe efectivamente eliminar una producto", async () => {
    await model.destroy(id);
    //one va a ser el objeto ANTES de la eliminación
    try {
      let after = await model.readOne(id);  
    } catch (error) {
      if (error.statusCode == 404)   after = null
    }
    
    //console.log(after);
    //after va a ser el objeto LUEGO de la elimininación
    assert.strictEqual(after, null);
  });




});




