import mongoose from "mongoose";

const cartDataSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  quantity: Number,
});

export const cartData =
  mongoose.models.carts || mongoose.model("carts", cartDataSchema);
