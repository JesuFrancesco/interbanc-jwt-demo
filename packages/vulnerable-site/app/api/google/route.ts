import { NextResponse } from "next/server";

export async function POST() {
  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID!;
  const redirectUri = process.env.GOOGLE_OAUTH_REDIRECT_URI!;

  const scopes = [
    "openid",
    "email",
    "profile",
    "https://www.googleapis.com/auth/gmail.readonly",
    "https://www.googleapis.com/auth/gmail.send",
    "https://www.googleapis.com/auth/user.phonenumbers.read",
    "https://www.googleapis.com/auth/user.addresses.read",
  ];

  // Store verifier in HttpOnly cookie (server-side only)
  const res = NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: "token",
      scope: scopes.join(" "),
      prompt: "consent",
    }).toString()}`
  );

  return res;
}
