import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { users } from '@/server/db/schema';
import { getRequestContext } from '@cloudflare/next-on-pages';
import * as schema from '@/server/db/schema/index';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';
import {  verifyToken } from 'utils/auth';

export const runtime = 'edge';


export async function GET(req: NextRequest) {
  try {
    const { env } = getRequestContext();
    const DB = drizzle(env.DB, { schema });
    const token = req.cookies.get('accessToken')?.value ?? '';

    const getUserData = await verifyToken(token)
    const userRecord = await DB.select().from(users).where(eq(users.email, getUserData.email));

    if (!userRecord || userRecord.length === 0) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }
    
      if (userRecord[0]) {
        const { password, refreshToken, resetPasswordToken, ...safeUser } = userRecord[0];

      return NextResponse.json({
        success: true,
        message: "User data fetched",
        user: { ...safeUser },
      },
    { status: 200});
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: String(error) }, { status: 400 });
  }
  
}
