import { NextResponse } from "next/server";
import { generateCodeVerifier, generateCodeChallenge } from "@/lib/pkce";

export async function POST() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID!;
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI!;
  const scopes = ["openid", "email", "profile"];
  const verifier = generateCodeVerifier();
  const challenge = generateCodeChallenge(verifier);

  // Store verifier in HttpOnly cookie (server-side only)
  const res = NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
      client_id: clientId,

      redirect_uri: redirectUri,
      response_type: "code",
      scope: scopes.join(" "),
      access_type: "offline",
      prompt: "consent",
      code_challenge: challenge,
      code_challenge_method: "S256",
    }).toString()}`
  );

  res.cookies.set({
    name: "pkce_verifier",
    value: verifier,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10, // 10 minutes
  });

  return res;
}
