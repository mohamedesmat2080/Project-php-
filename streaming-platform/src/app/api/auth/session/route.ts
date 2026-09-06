import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || !session.user) {
      return NextResponse.json({ authenticated: false }, { status: 401 })
    }

    const isAdmin = (session.user as any).role === "ADMIN"

    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: (session.user as any).role,
      },
      isAdmin,
    })
  } catch (error) {
    return NextResponse.json({ authenticated: false, error: "خطأ في التحقق" }, { status: 500 })
  }
}