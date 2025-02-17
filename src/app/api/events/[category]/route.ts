import { eq } from 'drizzle-orm';
import { getRequestContext } from '@cloudflare/next-on-pages';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '@/server/db/schema/index';
import { verifyToken } from 'utils/auth';

export const runtime = 'edge'

export async function GET(req: NextRequest, { params }: { params: { category: string } }) {
    try {
    const { env } = getRequestContext();
    const DB = drizzle(env.DB, { schema });

    const categoryName = params.category;
    
    // Fetch category ID by name
    const categoryData = await DB.select().from(schema.categories).where(eq(schema.categories.name, categoryName));
    if (!categoryData.length) {
        return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
    }

    const categoryId = categoryData[0]?.id;
    if (!categoryId) {
        return NextResponse.json({ success: false, message: 'Category ID not found' }, { status: 404 });
    }

    console.log("run successsfully");
    
    
    // Fetch events with related data
    const eventList = await DB
      .select()
      .from(schema.events)
      .leftJoin(schema.users, eq(schema.events.organiserId, schema.users.id))
      .leftJoin(schema.channels, eq(schema.events.channelId, schema.channels.id))
      .where(eq(schema.events.categoryId, categoryId));

      return NextResponse.json({ success: true, message: 'Data fetched successfully', eventList  }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ success: false, message: 'Internal server error', error: error.message  }, { status: 500 });
  }
}
