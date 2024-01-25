import dbConnect from "@/app/utils/dbConn";
import Cart from "../../models/cart";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const id = await req.nextUrl.searchParams.get("id");
  await dbConnect();
  await Cart.findByIdAndDelete(id);
  return NextResponse.json({ success: true }, { status: 200 });
}
