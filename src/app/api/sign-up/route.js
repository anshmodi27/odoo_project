import User from "@/app/models/user";
import mongoose from "mongoose";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await mongoose.connect(process.env.MONGODB_URL);
    await User.create({ name, email, password: hashedPassword });
    console.table({ name, email, password, hashedPassword });
    return NextResponse.json({ msg: "User Registered" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
