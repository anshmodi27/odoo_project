"use client";
import { totalAtom } from "@/app/variable";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import useRazorpay from "react-razorpay";

const Shipment = () => {
  const [billAddress, setBillAddress] = useState([]);
  const [shipAddress, setShipAddress] = useState([]);
  const [images, setImages] = useState([]);
  const [total, setTotal] = useAtom(totalAtom);
  const [Razorpay, isLoaded] = useRazorpay();

  const handlePayment = async () => {
    const options = {
      key: "rzp_test_VS3nX7dZzsfTBx", // Enter the Key ID generated from the Dashboard
      amount: Math.floor(total * 100), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Ansh Modi",
      description: "Test Transaction",
      // order_id: "order_" + makeid(14), //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
      handler: function (response) {},
      prefill: {
        name: "Ansh Modi",
        email: "youremail@example.com",
        contact: "9428989806",
      },
      theme: {
        color: "#000",
      },
    };

    const rzp1 = new Razorpay(options);

    rzp1.on("payment.failed", function (response) {});

    rzp1.open();
  };

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
            onChange={(e) => setShipAddress(e.target.value)}
            className="border-2 border-black rounded-md p-2 outline-none"
            value={shipAddress}
            rq
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Billing Address</label>
          <input
            type="text"
            placeholder="Enter Billing Address"
            className="border-2 border-black rounded-md p-2 outline-none"
            onChange={(e) => setBillAddress(e.target.value)}
            value={billAddress}
            rq
          />
        </div>
        <button
          onClick={() => {
            handlePayment();
          }}
          className="bg-black text-white rounded-md p-2 text-center"
        >
          <p>Proceed to Checkout</p>
        </button>
      </div>
    </div>
  );
};

export default Shipment;
