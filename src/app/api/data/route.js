import { Products } from "@/app/models/data";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  let data = [];
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    data = await Products.find();
    return NextResponse.json({ message: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
