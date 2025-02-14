import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { users } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { comparePassword, generateToken } from '@/utils/auth';

export const runtime = 'edge'; // Ensuring Edge Runtime

export async function POST(req: Request) {
  try {
    const { email, password }: { email: string; password: string } = await req.json();

    // Check if the user exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length === 0) {
      return NextResponse.json({ message: 'User not founf' }, { status: 404 });
    }

    const user = existingUser[0]!;

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = await generateToken(user.id);
    const response = NextResponse.json(
      { success: true, message: 'Login successful', user: { email: user.email, role: user.role, token } },
      { status: 200 }
    );

    response.headers.set(
      'Set-Cookie',
      `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`
    );

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Error signing in' }, { status: 500 });
  }
}
