import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.redirect(
    new URL("/images/0", request.url)
  );

  return response;
};

export const config = {
  matcher: '/',
};