import { MsgModel } from "./models/messages.model.js";

export default class MsgDaoMongoDB {
    
    async getAllProducts() {
        try {
            const response = await MsgModel.find ({});
            return response
        } catch (error) {
            console.log(error);
        }
}

async getProductById(id) {
    try {
        const response = await MsgModel.findById(id);
        return response
    } catch (error) {
        console.log(error);
        
    }
}

async createProduct (obj) {
    try {
        const response = await MsgModel.create(obj)
        return response
    } catch (error) {
        console.log(error);
        
    }
}

async updateProduct (id, obj) {
    try {
        await MsgModel.findByIdAndUpdate(id, obj, {new: true});
        return obj
    } catch (error) {
        console.log(error);
        
    }

 }

 async deleteProduct (id) {
    try {
        const response = await MsgModel.findByIdAndDelete(id);
        return response
        
    } catch (error) {
        
    }
}
}