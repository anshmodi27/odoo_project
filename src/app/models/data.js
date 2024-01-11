import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: String,
  price: String,
});

export const Products =
  mongoose.models.products || mongoose.model("products", productSchema);
