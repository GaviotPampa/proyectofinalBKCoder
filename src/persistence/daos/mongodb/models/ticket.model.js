import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      index: true,
    },
    purchase_datatime: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    purchaser: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const TicketModel = mongoose.model("ticket", TicketSchema);
