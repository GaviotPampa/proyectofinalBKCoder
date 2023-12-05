import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
    index: true,
    default: 0,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user", "premium"],
    default: "user",
    index: true,
  },
  documents: [
    {
      name: String,
      reference: String,
    },
  ],
  last_connection: {
    type: String,
  },

  cartId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "carts",
      default: [],
    },
  ],

  isGithub: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export const UserModel = mongoose.model("users", UserSchema);
