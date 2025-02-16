import { NextResponse } from 'next/server';
import { users } from '@/server/db/schema';
import { getRequestContext } from '@cloudflare/next-on-pages';
import * as schema from '@/server/db/schema/index';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import { comparePassword, generateToken, generateRefreshToken } from 'utils/auth';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const { email, password }: { email: string; password: string } = await req.json();

    // console.log('email and password = ', email, password);

    const { env } = getRequestContext();
    const DB = drizzle(env.DB, {schema});

    const existingUser = await DB.select().from(users).where(eq(users.email, email));

    // console.log('Database response:', existingUser);

    if (existingUser.length === 0) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    const user = existingUser[0]!;

    const isMatch = await comparePassword(password, user.password);

    // console.log('Hashed input password:', isMatch);
    // console.log('Stored password:', user.password);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (!user.email || !user.username) {
      return NextResponse.json({ error: 'User data is incomplete' }, { status: 400 });
    }
    const accessToken = await generateToken(user.id, user.username, user.email);
    const refreshToken = await generateRefreshToken(user.id); // Generate refresh token

    const {
      password: _,
      refreshToken: __,
      resetPasswordToken: ___,
      ...safeUser
    } = user;

    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        user: { ...safeUser, accessToken },
      },
      { status: 200 }
    );

    // Set cookies
    response.cookies.set("accessToken", accessToken, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 3600 });
    response.cookies.set("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "strict", maxAge: 2592000 });
    
    

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Error signing in' }, { status: 500 });
  }
}
