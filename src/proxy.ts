import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const session = req.auth;

  // Protect /account — must be logged in
  if (pathname.startsWith('/account')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=/account`, req.url));
    }
  }

  // Protect /checkout — must be logged in AND have verified phone
  if (pathname.startsWith('/checkout')) {
    if (!session?.user) {
      return NextResponse.redirect(new URL(`/login?callbackUrl=/checkout`, req.url));
    }
    if (!session.user.phone) {
      return NextResponse.redirect(new URL(`/account?setup=phone&next=/checkout`, req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/account/:path*', '/checkout'],
};
