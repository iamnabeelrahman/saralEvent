import { NextResponse } from 'next/server';
import { getRequestContext } from '@cloudflare/next-on-pages';
import * as schema from '@/server/db/schema/index';
import { drizzle } from 'drizzle-orm/d1';
import { users } from '@/server/db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from 'utils/auth';

// PBKDF2 Hashing Function

export const runtime = 'edge';

// Signup API Handler
export async function POST(req: Request) {
  try {
    const body = await req.json() as {
      email: string;
      username: string;
      password: string;
      fullName: string;
      bio: string;
      role: "general" | "organiser";
      organiserName?: string;
      organiserDescription?: string;
    };
    
    const { email, username, password, fullName, bio, role, organiserName, organiserDescription } = body;
    

    // Basic validation
    if (!email || !username || !password || !fullName) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    const { env } = getRequestContext();
    const DB = drizzle(env.DB);

    // Check if email exists
    const existingUser = await DB.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Handle organiser-specific fields
    const userData: {
      email: string;
      username: string;
      fullName: string;
      bio: string;
      role: "general" | "organiser";
      password: string;
      organiserName?: string;
      organiserDescription?: string;
    } = {
      email,
      username,
      fullName,
      bio,
      role,
      password: hashedPassword,
    };

    if (role === "organiser") {
      if (!organiserName || !organiserDescription) {
        return NextResponse.json(
          { message: "Organiser name and description are required for organisers" },
          { status: 400 }
        );
      }
      userData.organiserName = organiserName;
      userData.organiserDescription = organiserDescription;
    }

    // Insert user into database
    await DB.insert(users).values(userData);

    return NextResponse.json(
      { success: true, message: role === "organiser" ? "Organiser registered" : "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error registering user" }, { status: 500 });
  }
}
