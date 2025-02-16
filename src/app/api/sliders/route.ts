import { getRequestContext } from '@cloudflare/next-on-pages';
import { NextResponse } from 'next/server';
import * as schema from '@/server/db/schema/index';
import { drizzle } from 'drizzle-orm/d1';

export const runtime = 'edge';



export async function GET() {
  try {
    const { env } = getRequestContext();
    const DB = drizzle(env.DB, { schema });
    const sliderList = await DB.select().from(schema.sliders);

    return NextResponse.json(
      { success: true, message: 'Sliders sent', sliderList },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error fetching sliders' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
    try {
      const { env } = getRequestContext();
      // console.log("ENV:", env);  // 🛠 Debugging log
  
      if (!env?.DB) {
        console.error("❌ Error: env or env.DB is undefined");
        return NextResponse.json(
          { success: false, message: "Database environment not found" },
          { status: 500 }
        );
      }
  
      const DB = drizzle(env.DB, { schema });
      // console.log("✅ DB connected successfully");
  
      // Extract body
      const { title, imageUrl }: { title: string; imageUrl: string } = await req.json();
  
      if (!title || !imageUrl) {
        return NextResponse.json(
          { success: false, message: "Title and imageUrl are required" },
          { status: 400 }
        );
      }
  
      // Insert into DB
      const [newSlider] = await DB.insert(schema.sliders)
        .values({ title, imageUrl }) 
        .returning();
  
      return NextResponse.json(
        { success: true, message: "Sliders added", slider: newSlider },
        { status: 201 }
      );
    } catch (error) {
      console.error("❌ POST Error:", error);
      return NextResponse.json(
        { success: false, message: "Error adding new slider", error },
        { status: 500 }
      );
    }
  }
  