import { NextResponse, type NextRequest } from "next/server"

// import { withAuth } from "next-auth/middleware"

export { default } from "next-auth/middleware"

// export function middleware(request: NextRequest) {
//   console.log("middleware ", request.nextUrl.pathname)
//   return NextResponse.next()
// }

export const config = {
  matcher: [
    "/dashboard",
    "/wallets/:path",
  ],
}
