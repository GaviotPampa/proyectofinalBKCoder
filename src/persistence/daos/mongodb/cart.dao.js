import { CartModel } from "./models/cart.model.js";

export default class CartDaoMDB {
  async getAll() {
    try {
      const response = await CartModel.find({});
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getById(pid) {
    try {
      const response = await CartModel.findById({pid}).populate("products");
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async createCart(obj) {
    try {
      const response = await CartModel.create(obj);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async saveProductToCart(cid, obj) {
    try {
      const response = await CartModel.findByIdAndUpdate(cid, obj, {
        new: true,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCart(cid) {
    try {
      const response = await CartModel.findByIdAndDelete(cid);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async removeProd(pid) {
    try {
      const response = await CartModel.findByIdAndRemove({_id: pid});
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
