import React from "react";
import ProductCard from "./ProductCard";

const Product = () => {
  return (
    <div className="sm:w-[75%]">
      <div>
        <h3 className="text-2xl font-bold">Products</h3>
        <hr className="my-2 border-[1.5px] rounded border-black/60" />
      </div>
      <div className="hidden sm:flex flex-wrap items-center justify-start gap-y-8 gap-x-10">
        <ProductCard />
      </div>
      <div className="sm:hidden grid grid-cols-2 gap-y-8 gap-x-10">
        <ProductCard />
      </div>
    </div>
  );
};

export default Product;
