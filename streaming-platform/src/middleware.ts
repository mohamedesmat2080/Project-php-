import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any)?.role !== "ADMIN") {
    const loginUrl = new URL("/auth/signin", request.url)
    loginUrl.searchParams.set("callbackUrl", request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}