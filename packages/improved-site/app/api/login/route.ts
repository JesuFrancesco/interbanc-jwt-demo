import { NextResponse } from "next/server";
import { signToken } from "@/lib/jwt";

export async function POST(request: Request) {
  const { documentNumber, password } = await request.json();

  if (documentNumber === "12345678" && password === "password") {
    const token = await signToken({ documentNumber });

    const response = NextResponse.json({ message: "Inicio de sesión exitoso" });
    response.cookies.set("interbanc_access_token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600,
      path: "/",
    });

    return response;
  }

  return NextResponse.json(
    { error: "Credenciales inválidas" },
    { status: 401 }
  );
}
