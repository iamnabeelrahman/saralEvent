import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { users } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'edge'; // Ensuring Edge Runtime

export async function POST(req: Request) {
  try {
    const { email, password }: { email: string; password: string } = await req.json();

    // Check if the user exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length === 0) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }
    const user = existingUser[0]!;
    return NextResponse.json({ 
      success: true,
      message: "Login successful",
      user: { email: user.email, role: user.role } 
    }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Error signing in" }, { status: 500 });
  }
}
