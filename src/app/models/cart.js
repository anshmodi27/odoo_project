import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  userEmail: { type: String, required: true },
});

const Cart =
  mongoose.models.cart_details || mongoose.model("cart_details", cartSchema);

export default Cart;
