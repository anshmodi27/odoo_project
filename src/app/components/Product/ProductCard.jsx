"use client";
import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { cartAtom, searchAtom, userEmailAtom } from "../../variable";

const ProductCard = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useAtom(cartAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchAtom);
  const [email, setEmail] = useAtom(userEmailAtom);

  useEffect(() => {
    fetch("/api/data")
      .then((response) => response.json())
      .then((data) => setData(data["message"]))
      .catch((error) => console.log(error));
  }, []);

  const handleAddToCart = async (product) => {
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
          quantity: 1,
          userEmail: email,
        }),
      });

      if (!response.ok) {
        console.error("Failed to add item to cart:", response.statusText);
        return;
      }

      const result = await response.json();

      if (result.success) {
        console.log("Item added to cart:", result.data, result.data.quantity);
        if (result.data.quantity > 1) {
          setCart((prev) => {
            const newCart = prev.map((item) => {
              if (item._id === result.data._id) {
                return result.data;
              }
              return item;
            });
            return newCart;
          });
        } else {
          setCart([...cart, result.data]);
        }
      } else {
        alert(result.error);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <>
      {data.map((item) => {
        if (
          searchQuery === "" ||
          item.productName.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return (
            <div className="flex flex-col items-start gap-2" key={item._id}>
              <div className="w-32 h-32 border-2 border-black rounded-[15px]">
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
              <div>
                <div>
                  <p>{item.productName}</p>
                </div>
                <div>
                  <p>Rs {item.price}</p>
                </div>
              </div>
              <div
                className="bg-black text-white rounded-md p-2 cursor-pointer"
                onClick={() => handleAddToCart(item)}
              >
                <p>Add to Card</p>
              </div>
            </div>
          );
        }
      })}
    </>
  );
};

export default ProductCard;
