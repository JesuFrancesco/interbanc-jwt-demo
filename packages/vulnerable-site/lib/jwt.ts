import { JWTPayload, SignJWT, decodeJwt, jwtVerify } from "jose";
// import crypto from "crypto-js";

const SECRET_KEY = new TextEncoder().encode("123456789");
// const SECRET_KEY = new TextEncoder().encode(crypto.MD5("123456789").toString());

export const getPayload = (token: string) => {
  return decodeJwt(token);
};

export const signToken = async (payload: JWTPayload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(SECRET_KEY);
};

export const verifyToken = async (
  token: string
): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload as JWTPayload;
  } catch {
    return null;
  }
};
