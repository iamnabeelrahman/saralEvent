import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";

// PBKDF2 Hashing Function
async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const hashBuffer = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: 100000, hash: "SHA-256" },
    keyMaterial,
    256
  );

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

  return `${btoa(String.fromCharCode(...salt))}:${hashHex}`;
}

// Signup API Handler
export async function POST(req: Request) {
  try {
    const { email, username, password, fullName, bio }: {email: string, username: string, password: string, fullName: string, bio: string} = await req.json();

    if (!email || !username || !password || !fullName) {
      return NextResponse.json({ message: "All fields are required" }, { status: 400 });
    }

    // Check if email exists
    const existingUser = await db.select().from(users).where(eq(users.email, email));
    if (existingUser.length > 0) {
      return NextResponse.json({ message: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    await db.insert(users).values({
      email,
      username,
      fullName,
      bio,
      password: hashedPassword,
    });

    return NextResponse.json({ success: true, message: "User created successfully" }, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error registering user" }, { status: 500 });
  }
}
