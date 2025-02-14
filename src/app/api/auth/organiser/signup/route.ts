import { NextResponse } from 'next/server';
import { db } from '@/server/db';
import { users } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const {
      email,
      password,
      fullName,
      organiserName,
      organiserDescription,
    }: { 
      email: string; 
      password: string; 
      fullName: string; 
      organiserName: string;
      organiserDescription: string;
    } = await req.json();

    if (!email || !password || !fullName || !organiserName || !organiserDescription) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }
    // Check if email already exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }

    const newOrganiser = await db.insert(users).values({
      email, 
      fullName, 
      password,
      organiserName, 
      organiserDescription, 
      role: 'organiser',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Organiser created successfully',
        User: newOrganiser,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Error registering organiser' }, { status: 500 });
  }
}
