import { verifyToken } from "@/lib/jwt";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("interbanc_access_token")?.value;
  if (!token) {
    return new Response(JSON.stringify({ error: "Not authenticated" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const payload = verifyToken(token);

  return new Response(
    JSON.stringify({ message: "Authenticated", user: payload }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
