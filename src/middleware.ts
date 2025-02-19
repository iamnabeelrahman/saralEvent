import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "utils/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;

  const path = req.nextUrl.pathname
  const isPathPublic = path === '/sign-in' || path ==='/create-account'

  if (isPathPublic && token) {
    return NextResponse.redirect(new URL('/', req.nextUrl))
  }

  if (!isPathPublic && !token) {
    return NextResponse.redirect(new URL('/sign-in', req.nextUrl))
  }
  
  if (!token) {
    // No token found, proceed to the next request
    if (req.nextUrl.pathname.startsWith("/dashboard")) {
    }
    return NextResponse.next();
  }

  try {
    // Verify the token
    await verifyToken(token);

    // If user is logged in, prevent access to sign-in or create-account pages
    if (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/create-account") {
      return NextResponse.redirect(new URL("/", req.url));  // Redirect to home or dashboard
    }

    return NextResponse.next();
  } catch {
    // If token is invalid, redirect to sign-in
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }
}

// Apply middleware to relevant routes
export const config = {
  matcher: ["/dashboard", "/profile" ,"/sign-in", "/create-account"], // Protect these routes
};
