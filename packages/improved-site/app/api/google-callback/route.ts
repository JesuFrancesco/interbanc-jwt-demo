import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const exchangeCodeForToken = async (code: string, code_verifier: string) => {
  const params = new URLSearchParams({
    code,
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID!,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI!,
    grant_type: "authorization_code",
    code_verifier,
  });

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params.toString(),
  });

  const text = await res.text();
  console.log("🔍 Google token response:", res.status, text);

  if (!res.ok) return null;
  return JSON.parse(text);
};

const getUserInfo = async (accessToken: string) => {
  const res = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) return null;
  return res.json();
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Code not provided" }, { status: 400 });
  }

  const cookieStore = await cookies();
  const verifierCookie = cookieStore.get("pkce_verifier");
  const codeVerifier = verifierCookie?.value;

  if (!codeVerifier) {
    return NextResponse.json(
      { error: "Missing PKCE verifier" },
      { status: 400 }
    );
  }

  const tokenData = await exchangeCodeForToken(code, codeVerifier);

  if (!tokenData || !tokenData.access_token) {
    console.error("Google token response:", tokenData);
    return NextResponse.json(
      { error: "Token exchange failed", tokenData },
      { status: 401 }
    );
  }

  const userInfo = await getUserInfo(tokenData.access_token);
  if (!userInfo) {
    return NextResponse.json(
      { error: "Failed to fetch user info" },
      { status: 500 }
    );
  }

  // Return an HTML page that redirects to the dashboard with Google query params
  const redirectUrl = new URL("/dashboard", request.url);
  redirectUrl.searchParams.set("email", userInfo.email);
  redirectUrl.searchParams.set("name", userInfo.name);
  redirectUrl.searchParams.set("avatar", userInfo.picture);

  const res = new NextResponse(
    `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="refresh" content="0;url=${redirectUrl.toString()}" />
      </head>
      <body>
        <p>Redirecting to <a href="${redirectUrl.toString()}">dashboard</a>...</p>
      </body>
    </html>
  `,
    {
      headers: { "Content-Type": "text/html" },
    }
  );

  res.cookies.delete("pkce_verifier");
  return res;
}
