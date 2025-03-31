import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connect } from "@/lib/mongodb";
import { UserModel } from "@/models/User";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req: Request) {
  await connect();
  if (!JWT_SECRET) {
    return NextResponse.json(
      { error: "JWT_SECRET is not defined" },
      { status: 500 },
    );
  }
  const { action, username, password } = await req.json();
  if (!action || !username || !password) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }
  if (action === "register") {
    if (await UserModel.findOne({ username })) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }
    const newUser = new UserModel({
      username,
      password: await bcrypt.hash(password, 10),
    });
    await newUser.save();
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 },
    );
  }
  if (action === "login") {
    const user = await UserModel.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "2h" },
    );
    const response = NextResponse.json({
      message: "Login successful",
      id: user._id.toString(),
      username: user.username,
    });
    response.cookies.set("authToken", token, { httpOnly: true, maxAge: 7200 });
    return response;
  }
  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

export async function DELETE() {
  const response = NextResponse.json({ message: "Logout successful" });
  response.cookies.set("authToken", "", { httpOnly: true, maxAge: 0 });
  return response;
}
