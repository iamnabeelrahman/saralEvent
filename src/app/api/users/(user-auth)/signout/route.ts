import { NextResponse } from "next/server";

export const runtime = "edge"; // Ensure Edge Runtime

export async function POST() {
  try {
    // Clear the accessToken and refreshToken from the cookies
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    );

    // Set both accessToken and refreshToken cookies to expire immediately
    response.cookies.set("refreshToken", "", {httpOnly: true, expires: new Date(0)})
    response.cookies.set("accessToken", "", {httpOnly: true, expires: new Date(0)})

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Error logging out" }, { status: 500 });
  }
}
