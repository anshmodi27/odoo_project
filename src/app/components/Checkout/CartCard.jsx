"use client";
import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { cartAtom } from "../../variable";

const CartCard = () => {
  const [data, setData] = useAtom(cartAtom);

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
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  const handleIncrement = async (item) => {
    await updateCartQuantity(item, 1);
  };

  const handleDecrement = async (item) => {
    const newQuantity = item.quantity - 1;
    if (newQuantity > 0) {
      await updateCartQuantity(item, -1);
    } else {
      handleRemove(item);
    }
  };

  const handleRemove = async (item) => {
    try {
      const response = await fetch(`/api/delete-cart/?id=${item._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to remove item: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        document.getElementById(item._id).classList.add("scale-0");
        setTimeout(() => {
          setData((prev) => {
            const index = prev.findIndex((item2) => item2._id === item._id);
            const updatedCart = [...prev];
            updatedCart.splice(index, 1);
            return updatedCart;
          });
        }, 325);
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const updateCartQuantity = async (product, quantity) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          productName: product.productName,
          price: product.price,
          quantity: quantity,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update quantity: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success) {
        console.log("Quantity updated:", result.data);
        setData((prev) => {
          const index = prev.findIndex((item) => item._id === product._id);
          const updatedItem = {
            ...prev[index],
            quantity: result.data.quantity,
          };
          const updatedCart = [...prev];
          updatedCart[index] = updatedItem;
          return updatedCart;
        });
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  return (
    <>
      {data.map((item) => (
        <div
          key={item._id}
          id={item._id}
          className="transition-all duration-300"
        >
          <div
            className="flex flex-row items-center justify-center xl:justify-start gap-5"
            key={item._id}
          >
            <div className="w-20 h-20 border-2 border-black rounded-[15px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 30"
                x="0px"
                y="0px"
              >
                <path d="M17,4H7A3,3,0,0,0,4,7V17a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V7A3,3,0,0,0,17,4ZM14,5V8.13147L12.55469,7.168,12,6.79816l-.55469.36981L10,8.13147V5Zm5,12a2.00226,2.00226,0,0,1-2,2H7a2.0023,2.0023,0,0,1-2-2V7A2.0023,2.0023,0,0,1,7,5H9V9.06573a.50058.50058,0,0,0,.5014.50086.49438.49438,0,0,0,.27594-.08484L12,8l2.22266,1.48175a.49452.49452,0,0,0,.27594.08484A.50054.50054,0,0,0,15,9.06573V5h2a2.00226,2.00226,0,0,1,2,2Z" />
                <path d="M14,15H10a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Z" />
              </svg>
            </div>
            <div className="flex flex-col items-start justify-center">
              <div>
                <p>{item.productName}</p>
              </div>
              <div>
                <p>{`Rs ${item.price}`}</p>
              </div>
              <div className="flex items-center justify-start gap-3">
                <div className="flex flex-col xl:flex-row items-center justify-center gap-3">
                  <div className="flex items-center justify-center gap-3">
                    <p>Qty</p>
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span className="bg-[#f1eeee] px-2 text-black rounded-md border border-black">
                      {item.quantity}
                    </span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <button onClick={() => handleRemove(item)}>Remove</button>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-2 border-[1.5px] rounded border-black/60 w-full" />
        </div>
      ))}
    </>
  );
};

export default CartCard;
