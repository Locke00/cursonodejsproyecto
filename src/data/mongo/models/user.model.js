import { model, Schema } from "mongoose"  //Schema es el contructor de esquemas
import mongoosePaginate from "mongoose-paginate-v2"


const collection = "users"
const schema = new Schema({      // el id no lo necesito definir ya q se pone automaticamente. el primer elemento de schema son las propiedades
  email: { type: String, required: true, unique: true, index: true },  
  password: {type: String, required: true},
  name: { type: String, required: true },
  lastName: { type: String },
  role: { type: Number, default: 0 },
  photo: {type: String, default:"https://i.postimg.cc/wTgNFWhR/prifile.png"},
  age: { type: Number, default: 18},
  verified : { type: Boolean, default: false },
  verifiedCode : { type: String, required: true }

  //date: {type: Date, default: newDate()}

  },{ timestamps: true }
);

schema.plugin(mongoosePaginate)
const User = model(collection,schema);       // User debe estar en PascalCase, igual q los componentes de react
export default User;
