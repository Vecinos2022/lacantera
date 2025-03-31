import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
function verifyToken(token: string): boolean {
  try {
    if (!token || !JWT_SECRET) {
      return false;
    } else {
      jwt.verify(token, JWT_SECRET);
    }
    return true;
  } catch {
    return false;
  }
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("authToken")?.value;

  if (pathname.startsWith("/admin")) {
    if (!token || !verifyToken(token)) {
      const response = NextResponse.redirect(new URL("/login", req.url));
      response.cookies.delete("authToken");
      return response;
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
