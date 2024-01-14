"use client";

import Checkout from "../components/Checkout/Checkout";
import Header from "../components/Header";
import Product from "../components/Product/Product";

const page = () => {
  return (
    <div>
      <Header />
      <div className="p-10 font-nunito flex flex-col sm:flex-row items-start justify-center gap-5">
        <Product />
        <Checkout />
      </div>
    </div>
  );
};

export default page;
