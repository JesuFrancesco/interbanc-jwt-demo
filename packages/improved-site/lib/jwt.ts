import { JWTPayload, SignJWT, jwtVerify, importSPKI, importPKCS8 } from "jose";

const publicKey = Buffer.from(process.env.JWT_PUBLIC_KEY!, "base64").toString();
const privateKey = Buffer.from(
  process.env.JWT_PRIVATE_KEY!,
  "base64"
).toString();

const SECRET = await importPKCS8(privateKey, "RS512");
const PUBLIC_SECRET = await importSPKI(publicKey, "RS512");

export const signToken = async (payload: JWTPayload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "RS512" })
    .setExpirationTime("1h")
    .sign(SECRET);
};

export const verifyToken = async (
  token: string
): Promise<JWTPayload | null> => {
  try {
    const { payload } = await jwtVerify(token, PUBLIC_SECRET);
    return payload as JWTPayload;
  } catch {
    return null;
  }
};
