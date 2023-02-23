import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import GetImage from "./util/GetImage";

export async function middleware(request: NextRequest) {
  const Image = await GetImage('random', ['test1', 'test2']);
  const response = NextResponse.redirect(
    new URL(`/images/${Image?.slug}`, request.url)
  );

  return response;
};

export const config = {
  matcher: '/',
};