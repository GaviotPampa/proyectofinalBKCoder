import mongoose from "mongoose";

const msgSchema = new mongoose.Schema({
    
});

export const MsgModel = mongoose.model ('messages', msgSchema);