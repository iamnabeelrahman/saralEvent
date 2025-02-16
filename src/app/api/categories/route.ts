import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';
import * as schema from '@/server/db/schema/index';
import { drizzle } from 'drizzle-orm/d1';

export const runtime = 'edge';

export async function GET() {
  try {
    const { env } = getRequestContext();
    const DB = drizzle(env.DB, { schema });

    const categoryList = await DB.select().from(schema.categories);
    // console.log('category list: ', categoryList);

    return NextResponse.json(
      { success: true, message: 'Categories fetched', categoryList },
      { status: 200 }
    );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json(
      { success: false, message: 'Error fetching categories' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { env } = getRequestContext();
    // console.log('ENV:', env);

    if (!env?.DB) {
      console.error('Error: env or env.DB is undefined');
      return NextResponse.json(
        { success: false, message: 'Database environment not found' },
        { status: 500 }
      );
    }

    const DB = drizzle(env.DB, { schema });
    // console.log('✅ DB connected successfully');

    const { name, icon }: { name: string; icon?: string } = await req.json();

    if (!name) {
      return NextResponse.json(
        { success: false, message: 'Category name is required' },
        { status: 400 }
      );
    }

    const [newCategory] = await DB.insert(schema.categories)
      .values({ name, icon })
      .returning();

    return NextResponse.json(
      { success: true, message: 'Category added', category: newCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error('POST Error:', error);
    return NextResponse.json(
      { success: false, message: 'Error adding category', error },
      { status: 500 }
    );
  }
}
