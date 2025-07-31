import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  const publicPaths = ['/pages/userAuthentication/loginForm', '/pages/userAuthentication/registerFF'];

  const token = await getToken({ req, secret: process.env.AUTH_SECRET });
  console.log('middle ware token', token);


  if (publicPaths.some(path => pathname.startsWith(path))) {
    if (token) {
      return NextResponse.redirect(new URL('/adminDashboard', req.url));
    }
    return NextResponse.next();
  }

  // ২. প্রাইভেট রাউটে এক্সেস (লগিন চেক)
  if (!token) {
    const loginUrl = new URL('/pages/userAuthentication/loginForm', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ৩. অ্যাডমিন রাউটে এক্সেস (রোল চেক)
  if (pathname.startsWith('/adminDashboard') && token.role !== 'Admin') {
    return NextResponse.redirect(new URL('/access-denied', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/adminDashboard/:path*',
    '/pages/userAuthentication/:path*'
  ]
};