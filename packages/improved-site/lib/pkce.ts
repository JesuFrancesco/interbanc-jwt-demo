import { randomBytes, createHash } from "crypto";

// Generate a random string for the code verifier
export function generateCodeVerifier(length = 64) {
  return base64UrlEncode(randomBytes(length));
}

// Generate a SHA-256 code challenge from the verifier
export function generateCodeChallenge(verifier: string) {
  const hash = createHash("sha256").update(verifier).digest();
  return base64UrlEncode(hash);
}

// Helper to encode Base64 URL-safe
function base64UrlEncode(buffer: Buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
