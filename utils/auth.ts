import { SignJWT, jwtVerify } from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const refreshSecret = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET);

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Buffer.from(hashBuffer).toString('hex');
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  const hashedPassword = await hashPassword(password);
  return hashedPassword === hash;
}

// Generate Access Token
export async function generateToken(userId: string): Promise<string> {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);
}

// Generate Refresh Token
export async function generateRefreshToken(userId: string): Promise<string> {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d') // Refresh token valid for 30 days
    .sign(refreshSecret);
}

// Verify Access Token
export async function verifyToken(token: string): Promise<any> {
  return await jwtVerify(token, secret);
}

// Verify Refresh Token
export async function verifyRefreshToken(token: string): Promise<any> {
  return await jwtVerify(token, refreshSecret);
}

// Check User logged in

export function checkUserSignedStatus(): boolean {
  if (typeof window === "undefined") return false; // Ensure it runs only in the client-side

  const cookies: Record<string, string> = document.cookie
    .split("; ")
    .reduce((acc, cookie) => {
      if (!cookie.includes("=")) return acc; // ✅ Ensure valid key=value pair

      const parts = cookie.split("=");
      const key = decodeURIComponent(parts[0]?.trim() || ""); // ✅ Prevent undefined errors
      const value = decodeURIComponent(parts[1]?.trim() || "");

      if (key) acc[key] = value; // ✅ Only store valid cookies
      return acc;
    }, {} as Record<string, string>);

  return Boolean(cookies["accessToken"]); // ✅ Check existence safely
}


