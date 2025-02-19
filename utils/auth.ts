import { SignJWT, jwtVerify, JWTVerifyResult } from 'jose';

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

export async function generateToken(
  userId: string,
  username: string,
  email: string
): Promise<string> {
  return await new SignJWT({ userId, username, email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(secret);
  }
  
  export async function verifyToken(token: string): Promise<any> {
    try {
      const decodedToken = await jwtVerify(token, secret);
      console.log("user email value ", decodedToken.payload );
      
      return decodedToken.payload as { userId: string; email: string; username: string };
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('expired')) {
  
          console.error('Token expired');
  
          return null; // Token expired, handle accordingly
        } else if (error.message.includes('invalid')) {
  
          console.error('Invalid token', error);
  
          return null; // Invalid token, handle accordingly
        } else {
  
          console.error('Unexpected error during token verification', error);
          throw new Error('Unexpected error during token verification');
        }
      } else {
  
        console.error('An unknown error occurred', error);
        throw new Error('Unknown error during token verification');
      }
    }
  }


export async function generateRefreshToken(userId: string): Promise<string> {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d') // Refresh token valid for 30 days
    .sign(refreshSecret);
}


export async function verifyRefreshToken(token: string): Promise<any> {
  try {
    const decodedToken = await jwtVerify(token, refreshSecret);

    return decodedToken.payload as { userId: string; email: string; username: string };
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('expired')) {

        console.error('Token expired');

        return null; // Token expired, handle accordingly
      } else if (error.message.includes('invalid')) {

        console.error('Invalid token', error);

        return null; // Invalid token, handle accordingly
      } else {

        console.error('Unexpected error during token verification', error);
        throw new Error('Unexpected error during token verification');
      }
    } else {

      console.error('An unknown error occurred', error);
      throw new Error('Unknown error during token verification');
    }
  }
}

export function checkUserSignedStatus(): boolean {
  if (typeof window === 'undefined') return false; // Ensure it runs only in the client-side

  const cookies: Record<string, string> = document.cookie.split('; ').reduce(
    (acc, cookie) => {
      if (!cookie.includes('=')) return acc; // ✅ Ensure valid key=value pair

      const parts = cookie.split('=');
      const key = decodeURIComponent(parts[0]?.trim() || ''); // ✅ Prevent undefined errors
      const value = decodeURIComponent(parts[1]?.trim() || '');

      if (key) acc[key] = value; // ✅ Only store valid cookies
      return acc;
    },
    {} as Record<string, string>
  );

  return Boolean(cookies.accessToken); // ✅ Check existence safely
}
