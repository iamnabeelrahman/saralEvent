import { NextResponse } from "next/server";

export const runtime = "edge"; // Ensure Edge Runtime

export async function POST() {
  try {
    // Clear the JWT token from the cookie
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );

    response.headers.set(
      "Set-Cookie",
      `token=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`
    );

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Error logging out" }, { status: 500 });
  }
}
