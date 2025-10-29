import { NextResponse } from "next/server";
import { signToken } from "@/lib/jwt";

const demoUser = {
  documentNumber: "12345678",
  password: "password",
};

export async function POST(request: Request) {
  const data = await request.json();

  if (
    data.documentNumber === demoUser.documentNumber &&
    data.password === demoUser.password
  ) {
    const token = await signToken(data);

    const response = NextResponse.json({ message: "Inicio de sesión exitoso" });

    response.cookies.set("interbanc_access_token", token, {
      httpOnly: false,
      sameSite: "lax",
      secure: false,
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
