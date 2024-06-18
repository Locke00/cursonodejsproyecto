import argsUtil from "../utils/args.util.js";
import crypto from "crypto";

class ProductDTO {
  constructor(data) {
    argsUtil.env !== "prod" &&
      (this._id = crypto.randomBytes(12).toString("hex"));
    this.title = data.title;
    this.photo = data.photo || "https://i.postimg.cc/wTgNFWhR/profile.png";
    this.price = data.price || 0;
    this.stock = data.stock || 0;
    argsUtil.env !== "prod" && (this.updatedAt = new Date());
    argsUtil.env !== "prod" && (this.createdAt = new Date());
  }
}

export default ProductDTO;
