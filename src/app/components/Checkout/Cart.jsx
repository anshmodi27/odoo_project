"use client";
import { useEffect, useState } from "react";
import CartCard from "./CartCard";

const Cart = () => {
  const [data, setData] = useState([]);

  // State for total, tax, and subtotal
  const [total, setTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const response = await fetch("/api/cart-data");
      if (!response.ok) {
        throw new Error(`Failed to fetch cart data: ${response.statusText}`);
      }
      const result = await response.json();
      setData(result.message);

      // Calculate total, tax, and subtotal
      const newSubtotal = result.message.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const newTax = 0.1 * newSubtotal;
      const newTotal = newSubtotal + newTax;

      setSubtotal(newSubtotal);
      setTax(newTax);
      setTotal(newTotal);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const handleCartUpdate = () => {
    fetchCartData();
  };

  return (
    <div>
      <div>
        <h3 className="text-2xl font-bold">Cart</h3>
        <hr className="my-2 border-[1.5px] rounded border-black/60" />
      </div>
      <div className="flex flex-col items-start justify-start gap-5 h-[400px] overflow-y-scroll shadow-sm shadow-neutral-700 rounded-md p-2 my-2">
        <CartCard onCartUpdate={handleCartUpdate} />
      </div>
      <div className="flex flex-col justify-start gap-5">
        <div className="flex items-center justify-between text-[18px]">
          <p>Cart Total</p>
          <p>{`Rs ${subtotal.toFixed(2)}`}</p>
        </div>
        <div>
          <div className="flex items-center justify-between text-[18px]">
            <p>Tax</p>
            <p>{`Rs ${tax.toFixed(2)}`}</p>
          </div>
          <hr className="my-2 border-[1.5px] rounded border-black/60" />
          <div className="flex items-center justify-between text-[18px]">
            <p>Sub Total</p>
            <p>{`Rs ${total.toFixed(2)}`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
