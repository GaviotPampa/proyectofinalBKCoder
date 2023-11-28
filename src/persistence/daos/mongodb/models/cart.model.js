import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      quantity: {
        type: Number,
        required: true,
      },
      ref: "products",
      default: [],
    },
  ],
});

CartSchema.pre("find", function () {
  this.populate("products");
});

export const CartModel = mongoose.model("carts", CartSchema);
