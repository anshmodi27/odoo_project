import React from "react";

const Shipment = () => {
  return (
    <div>
      <div>
        <h3 className="text-2xl font-bold">Shipment</h3>
        <hr className="my-2 border-[1.5px] rounded border-black/60" />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="">Shipment Address</label>
          <input
            type="text"
            placeholder="Enter Shipment Address"
            className="border-2 border-black rounded-md p-2 outline-none"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Billing Address</label>
          <input
            type="text"
            placeholder="Enter Billing Address"
            className="border-2 border-black rounded-md p-2 outline-none"
          />
        </div>
        <button className="bg-black text-white rounded-md p-2 text-center">
          <p>Proceed to Checkout</p>
        </button>
      </div>
    </div>
  );
};

export default Shipment;
