import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
//schema
const ProductSchema = new Schema({
  titulo: {
    type: String,
    required: true,
    index: true,
  },
  descripcion: { type: String },
  importe: {
    type: Number,
    required: true,
  },
  codigo: {
    type: String,
    required: true,
    unique: true,
  },
  estado: {
    type: Boolean,
    required: true,
    default: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
  owner: [
    {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      default: "admin",
    },
  ],
  thumbnails: [
    {
      type: String,
    },
  ],
  inCart: {
    type: Boolean,
    default: false,
  },
});

ProductSchema.plugin(mongoosePaginate);

//modelo de product, recibe dos parametros la coleccion y el modelo
export const ProductModel = model("products", ProductSchema);
