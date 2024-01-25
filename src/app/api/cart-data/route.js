import Cart from "@/app/models/cart";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req) {
  const email = await req.nextUrl.searchParams.get("userEmail");
  console.log(email);
  let data = [];
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    data = await Cart.find({ userEmail: email });
    return NextResponse.json({ message: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
