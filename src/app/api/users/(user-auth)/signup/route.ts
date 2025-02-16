import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import * as schema from '@/server/db/schema/index';
import { drizzle } from 'drizzle-orm/d1';
import { users } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from 'utils/auth';

// PBKDF2 Hashing Function

export const runtime = 'edge';

// Signup API Handler
export async function POST(req: Request) {
  try {
    const {
      email,
      username,
      password,
      fullName,
      bio,
    }: { email: string; username: string; password: string; fullName: string; bio: string } =
      await req.json();

    if (!email || !username || !password || !fullName) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const { env } = getRequestContext();
    const DB = drizzle(env.DB, {schema});

    // Check if email exists
    const existingUser = await DB.select().from(users).where(eq(users.email, email));
    console.log(existingUser);

    if (existingUser.length > 0) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    await DB.insert(users).values({
      email,
      username,
      fullName,
      bio,
      password: hashedPassword,
    });

    return NextResponse.json(
      { success: true, message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
  }
}
