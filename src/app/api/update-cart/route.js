import dbConnect from "@/app/utils/dbConn";
import Cart from "../../models/cart";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  // console.log(req.method);

  const body = await req.json();
  await dbConnect();

  try {
    // const cartData = await Cart.find(body);
    // if (cartData.length > 0) {
    //   return NextResponse.json({
    //     success: false,
    //     error: "Item already in cart",
    //   });
    // }
    const cartItem = await Cart.create(body);
    return NextResponse.json({ success: true, data: cartItem });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error,
    });
  }
}
