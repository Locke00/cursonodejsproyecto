import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const collection = "products";
const schema = new Schema(
  {
    title: { type: String, required: true, index: true },
    photo: { 
      type: String,
      default: "https://i.postimg.cc/wTgNFWhR/profile.png"
    },
    price: { type: Number, default: 0},
    stock: { type: Number, default: 0}

    // si quisiera usar un array (aunq no se recomienda usar arrays)
    //poster: [{ 
    //  type: String, 
    //  default: "https://eikonos.com/wp-content/webp-express/webp-images/uploads/2019/11/G2J_Eikonos_nov2019_consejos_diseno_para_eventos.jpg.webp" 
    //]},
    
  },
  {
    timestamps: true
  }
);

schema.plugin(mongoosePaginate)
const Product = model(collection, schema);
export default Product;
