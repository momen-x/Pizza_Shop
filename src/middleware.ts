import { NextResponse, NextRequest } from "next/server";
import { tokenName } from "./utils/tokenName";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get(tokenName);
  const token = jwtToken?.value as string;
  if (!token) {
    if (request.nextUrl.pathname === "/profile") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (request.nextUrl.pathname === "/logout") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    if (request.nextUrl.pathname === "/Admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    
  } else {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

export const config = {
  matcher: ["/login", "/register", "/profile", "/Admin/:path*"],
};
