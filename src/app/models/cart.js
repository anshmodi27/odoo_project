import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

const Cart = mongoose.models.carts || mongoose.model("carts", cartSchema);

export default Cart;
