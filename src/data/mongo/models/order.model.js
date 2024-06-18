import { model, Schema, Types } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "orders"
const schema = new Schema({
  user_id: { type: Types.ObjectId, required: true, ref: "users" },  // ref es una propiedad obligatoria de cada referencia
  product_id: { type: Types.ObjectId, required: true, ref: "products" },
  //las propiedades q necesiten referenciarse o relacionarse con otros modelos
    //de otras colecciones deben configurarse como de tipo ObjectId
    //y con el atributo ref, para referenciar hacia "tal coleccion"
    //en ref va el nombre de la coleccion q se quiere referenciar
  quantity: { type: Number, default: 1 },
  state: { type: String, default: "reserved", enum: ["reserved","paid","delivered"] }
  //el enum permiteponer los unicos strings q se pueden pasar. no permite otros valores
  //se utilizar para validar los datos

  // en state pasa lo mismo q con los roles
    //puede definirlo como nro:
      //0
      //1
      //2
    //o como string
      //reserver
      //payed
      //delivered
},{ timestamps: true })   // timestamp hace q se agreguen los elementos de cuando fue creado y modificado

//agregar el middleware PRE


        //.populate("user_id","-password -createdAt -updatedAt -__v")  // '-', para q esos campos no se agreguen
        //.populate("event_id","name planes price")   // para q esos campos si se agregen
schema.pre("find", function(){ this.populate("user_id","-password -createdAt -updatedAt -__v") })   // aqui el callback tiene q ser una funcion anonima tradicional (no funcion flecha)
schema.pre("find", function(){ this.populate("product_id","title photo price stock") })



schema.plugin(mongoosePaginate)
const Order = model(collection,schema)
export default Order