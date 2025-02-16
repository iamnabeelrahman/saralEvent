import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest, NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/server/db/schema/index";
import { verifyToken } from "utils/auth";
// import { verifyUser } from "@/server/auth"; // 🔒 Import authentication function

export const runtime = "edge";

// ✅ GET: Fetch all events (Public)
export async function GET(req: Request) {
  try {
    const { env } = getRequestContext();
    const DB = drizzle(env.DB, { schema });

    const eventList = await DB.select().from(schema.events);

    return NextResponse.json(
      { success: true, message: "Events fetched successfully", eventList },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ GET Error:", error);
    return NextResponse.json(
      { success: false, message: "Error fetching events" },
      { status: 500 }
    );
  }
}

  // ✅ POST: Create a new event (Only Authenticated Users)
  export async function POST(req: NextRequest) {
    try {
      const { env } = getRequestContext();
      const DB = drizzle(env.DB, { schema });
      
      // Extract token from cookies
      const token = req.cookies.get('accessToken')?.value || '';
  
      // Verify user token
      const getUserData = await verifyToken(token);
      if (!getUserData) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 }
        );
      }
  
      // Parse request body
      const {
        title,
        description,
        date,
        location,
        price,
        categoryId,
        channelId,
      }: { 
        title: string;
        description: string;
        date: any;
        location: string;
        price: any;
        categoryId: any;
        channelId: any;
      } = await req.json();
  
      // Validate required fields
      if (!title || !date || !location || !price) {
        return NextResponse.json(
          { success: false, message: "Missing required fields" },
          { status: 400 }
        );
      }

const timestamp = new Date(date);
  
      // Insert event into database
      const [newEvent] = await DB.insert(schema.events)
        .values({
          title,
          description,
          date: timestamp,
          location,
          price,
          categoryId,
          organiserId: getUserData.userId, // 🔥 Use verified userId
          channelId,
        })
        .returning();
  
      return NextResponse.json(
        { success: true, message: "Event created successfully", event: newEvent },
        { status: 201 }
      );
    } catch (error) {
      console.error("❌ POST Error:", error);
      return NextResponse.json(
        { success: false, message: "Error creating event" },
        { status: 500 }
      );
    }
  }
  

// ✅ PUT: Update an event (Only Authenticated User & Own Event)
// export async function PUT(req: Request) {
//   try {
//     const { env } = getRequestContext();
//     const DB = drizzle(env.DB, { schema });

//     const user = await verifyUser(req);
//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const { id, title, description, date, location, price, categoryId, channelId }: any = await req.json();

//     if (!id) {
//       return NextResponse.json(
//         { success: false, message: "Event ID is required" },
//         { status: 400 }
//       );
//     }

//     // 🔒 Ensure the user owns the event before updating
//     const event = await DB.select().from(schema.events).where(schema.events.id.eq(id)).limit(1);
//     if (!event.length || event[0].organiserId !== user.id) {
//       return NextResponse.json(
//         { success: false, message: "You can only update your own events" },
//         { status: 403 }
//       );
//     }

//     // Update event
//     const updatedEvent = await DB.update(schema.events)
//       .set({ title, description, date, location, price, categoryId, channelId })
//       .where(schema.events.id.eq(id))
//       .returning();

//     return NextResponse.json(
//       { success: true, message: "Event updated successfully", event: updatedEvent[0] },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("❌ PUT Error:", error);
//     return NextResponse.json(
//       { success: false, message: "Error updating event" },
//       { status: 500 }
//     );
//   }
// }

// // ✅ DELETE: Remove an event (Only Authenticated User & Own Event)
// export async function DELETE(req: Request) {
//   try {
//     const { env } = getRequestContext();
//     const DB = drizzle(env.DB, { schema });

//     const user = await verifyUser(req);
//     if (!user) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     const { id } = await req.json();
//     if (!id) {
//       return NextResponse.json(
//         { success: false, message: "Event ID is required" },
//         { status: 400 }
//       );
//     }

//     // 🔒 Ensure the user owns the event before deleting
//     const event = await DB.select().from(schema.events).where(schema.events.id.eq(id)).limit(1);
//     if (!event.length || event[0].organiserId !== user.id) {
//       return NextResponse.json(
//         { success: false, message: "You can only delete your own events" },
//         { status: 403 }
//       );
//     }

//     await DB.delete(schema.events).where(schema.events.id.eq(id));

//     return NextResponse.json(
//       { success: true, message: "Event deleted successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("DELETE Error:", error);
//     return NextResponse.json(
//       { success: false, message: "Error deleting event" },
//       { status: 500 }
//     );
//   }
// }

// 
// import { NextResponse } from "next/server";
// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export const runtime = "edge"; // ✅ Works in Edge Runtime

// export async function POST(req: Request) {
//   try {
//     const { to, subject, message } = await req.json();

//     const data = await resend.emails.send({
//       from: "noreply@yourdomain.com",
//       to,
//       subject,
//       html: `<p>${message}</p>`,
//     });

//     return NextResponse.json({ success: true, data }, { status: 200 });
//   } catch (error) {
//     console.error("Resend Error:", error);
//     return NextResponse.json({ success: false, error }, { status: 500 });
//   }
// }
