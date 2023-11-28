import { Schema, model } from "mongoose";
//schema Product Mock

const ProdFakeSchema = new Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  description: { type: String },
  price: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },

  inCart: {
    type: Boolean,
    default: false,
  }
});


//modelo de product, recibe dos parametros la coleccion y el modelo
export const ProductFakeModel = model("productsFake", ProdFakeSchema);
