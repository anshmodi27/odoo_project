import React from "react";
import Cart from "./Cart";
import Shipment from "./Shipment";
import Qr from "./Qr";

const Checkout = () => {
  return (
    <div className="sm:w-[25%] flex flex-col gap-5">
      <Cart />
      <Shipment />
      <div className="flex items-center justify-center">
        <Qr />
      </div>
    </div>
  );
};

export default Checkout;
