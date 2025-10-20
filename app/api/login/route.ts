import { NextResponse } from "next/server";
import { signToken } from "@/lib/jwt";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (email === "demo@user.com" && password === "123456") {
    const token = await signToken({ email });

    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
    });

    return response;
  }

  return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
}
