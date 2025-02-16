import { NextResponse } from 'next/server';
import { users } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { getRequestContext } from '@cloudflare/next-on-pages';
import * as schema from '@/server/db/schema/index';
import { drizzle } from 'drizzle-orm/d1';

export const runtime = 'edge';

export async function PATCH(req: Request) {
  try {
    const {
      email,
      organiserName,
      organiserDescription,
    }: { 
      email: string;
      organiserName: string;
      organiserDescription: string;
    } = await req.json();

    if (!email || !organiserName || !organiserDescription) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 });
    }

    const { env } = getRequestContext();
    const DB = drizzle(env.DB, { schema });

    // Check if the user exists
    const existingUser = await DB.select().from(users).where(eq(users.email, email)).limit(1).then(res => res[0]);

    if (!existingUser) {
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
      }

    // Check if the user is already an organiser
    if (existingUser?.role === 'organiser') {
        return NextResponse.json({ message: 'User is already an organiser' }, { status: 400 });
      }

    await DB
      .update(users)
      .set({ role: 'organiser', organiserName, organiserDescription })
      .where(eq(users.email, email));

    return NextResponse.json(
      { success: true, message: 'User upgraded to organiser successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Error upgrading user role' }, { status: 500 });
  }
}