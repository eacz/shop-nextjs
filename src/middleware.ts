import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/checkout')) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if (!session) {
      const requestedPage = req.nextUrl.pathname
      const url = req.nextUrl.clone()
      url.pathname = `/auth/login`
      url.search = `page=${requestedPage}`

      return NextResponse.redirect(url)
    }

    return NextResponse.next()
  }
}
// Only the paths declared in here will run the middleware
export const config = {
  matcher: ['/checkout/address', '/checkout/summary'],
}
