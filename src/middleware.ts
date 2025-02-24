import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { AUTH_COOKIES_KEY } from './lib/constant';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname;
  // Check if the path is a dashboard route
  if (pathname.startsWith('/dashboard')) {
    // Try to get the user's auth data from cookies
    const authStorageData = request.cookies.get(AUTH_COOKIES_KEY);

    if (!authStorageData) {
      // No auth data, redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  // Continue with the request if no restrictions apply
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
};
