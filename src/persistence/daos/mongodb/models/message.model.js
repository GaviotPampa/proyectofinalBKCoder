import mongoose from "mongoose";

const MsgSchema = new mongoose.Schema({
  email_user: {
    type: String,
    required: true,
  },

  message: {
    type: String,
  } /* mensaje del usuario */,
});

export const MsgModel = mongoose.model("messages", MsgSchema);
