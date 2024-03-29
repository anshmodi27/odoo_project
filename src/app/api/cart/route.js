import dbConnect from "@/app/utils/dbConn";
import Cart from "../../models/cart";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const body = await req.json();
  await dbConnect();

  try {
    console.log(body);
    const existingCartItem = await Cart.findOne({
      productName: body.productName,
    });

    if (existingCartItem) {
      existingCartItem.quantity += body.quantity;

      if (existingCartItem.quantity <= 0) {
        await existingCartItem.remove();
        return NextResponse.json({ success: true, data: null });
      }

      await Cart.updateOne(
        { _id: existingCartItem._id },
        { $set: existingCartItem }
      );
      return NextResponse.json({ success: true, data: existingCartItem });
    } else {
      const cartItem = await Cart.create(body);
      return NextResponse.json({ success: true, data: cartItem });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error,
    });
  }
}
