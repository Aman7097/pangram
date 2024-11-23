/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./server-actions/auth";

// Define paths that don't require authentication
const publicPaths = ["/login", "/signup"];

// Function to check if the path is public
const isPublicPath = (path: string) => {
  return publicPaths.some((publicPath) => path.startsWith(publicPath));
};

async function validateToken(token: string) {
  try {
    const response = await getCurrentUser(token);

    if (!response.success) {
      return null;
    }

    return await response.data;
  } catch (error) {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value;
  const isPublic = isPublicPath(path);

  // If no token and trying to access private route
  if (!token && !isPublic) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If has token, validate it
  if (token) {
    const user = await validateToken(token);

    // If token is invalid
    if (!user && !isPublic) {
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token"); // Clear invalid token
      return response;
    }

    // If token is valid and trying to access public routes
    if (user && isPublic) {
      const response = NextResponse.redirect(new URL("/home", request.url));

      // Clone headers to modify them
      const requestHeaders = new Headers(request.headers);
      // Add user info to header for downstream use
      requestHeaders.set("x-user-data", JSON.stringify(user));

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    // If token is valid and accessing private routes
    if (user) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-user-data", JSON.stringify(user));

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }
  }

  return NextResponse.next();
}

// Configure the paths where middleware should run
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
