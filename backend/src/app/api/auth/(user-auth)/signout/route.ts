// pages/api/logout.ts
import { NextResponse } from "next/server";

export const runtime = "edge"; // Ensure Edge Runtime

export async function POST() {
  try {
    // Clear the accessToken and refreshToken from the cookies
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );

    // Set both accessToken and refreshToken cookies to expire immediately (Max-Age=0)
    response.headers.set(
      "Set-Cookie",
      `accessToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`
    );

    response.headers.append(
      "Set-Cookie",
      `refreshToken=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`
    );

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Error logging out" }, { status: 500 });
  }
}
