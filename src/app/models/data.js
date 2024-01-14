import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: String,
  price: String,
});

export const Products =
  mongoose.models.products_details ||
  mongoose.model("products_details", productSchema);
