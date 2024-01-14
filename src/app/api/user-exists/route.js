import User from "@/app/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    const { email } = await req.json();
    const user = await User.findOne({ email }).select("_id");
    console.log(user);
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
