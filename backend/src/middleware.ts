import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "utils/auth"; // Import your token verification function

export async function middleware(req: NextRequest) {
  // Extract token from cookies
  const token = req.cookies.get("accessToken")?.value;

  // If there's no token, deny access to protected routes
  if (!token) {
    if (req.nextUrl.pathname.startsWith("/dashboard") || req.nextUrl.pathname.startsWith("/profile")) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    return NextResponse.next();
  }

  try {
    // Verify the token
    await verifyToken(token);

    // If user is logged in, prevent access to sign-in page
    if (req.nextUrl.pathname === "/sign-in" || "create-account") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    
    return NextResponse.next();
  } catch {
    // If token is invalid, redirect to sign-in
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}

// Apply middleware to relevant routes
export const config = {
  matcher: ["/dashboard", "/profile", "/sign-in", "/create-account"], // Protect these routes
};
