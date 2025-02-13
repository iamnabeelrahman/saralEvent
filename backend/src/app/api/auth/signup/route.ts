import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { db } from '@/server/db';
import { users } from '@/server/db/schema';
import { drizzle } from 'drizzle-orm/d1';
import { and, eq } from 'drizzle-orm';

export const runtime = 'edge'; // Ensuring Edge Runtime

export async function POST(req: Request) {
  try {
    const {
      email,
      username,
      password,
      fullName,
      bio,
    }: { email: string; password: string; username: string; fullName: string; bio: string } =
      await req.json();
      if (!email || !username || !password || !fullName) {
        return NextResponse.json({ message: 'All fileds are required' }, { status: 400 });
      }

    const existingEmail = await db.select().from(users).where(eq(users.email, email));
    if (existingEmail.length > 0) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }
    const existingUsername = await db.select().from(users).where(eq(users.username, username));
    if (existingUsername.length > 0) {
      return NextResponse.json({ message: 'Username already exists' }, { status: 400 });
    }



    // Create user in DB
    const newUser = await db.insert(users).values({ email, username, fullName, bio, password });

    // Create session
    // const session = await lucia.createSession(email);
    return NextResponse.json(
      {
        success: true,
        message: 'User created Successfully',
        User: newUser,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Error registering user' }, { status: 500 });
  }
}
