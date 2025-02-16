import { NextResponse } from 'next/server';
import { users } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { getRequestContext } from '@cloudflare/next-on-pages';
import * as schema from '@/server/db/schema/index';
import { drizzle } from 'drizzle-orm/d1';

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
      return NextResponse.json({ success: false,  message: 'All fields are required' }, { status: 400 });
    }

    const { env } = getRequestContext();
    const DB = drizzle(env.DB, { schema });

    // Check if email already exists
    const existingUser = await DB.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return NextResponse.json({success: false, message: 'Email already exists' }, { status: 400 });
    }

    const newOrganiser = await DB.insert(users).values({
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
    return NextResponse.json({ success: false, message: 'Error registering organiser' }, { status: 500 });
  }
}
