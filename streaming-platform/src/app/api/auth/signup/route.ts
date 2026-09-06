import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ error: "جميع الحقول مطلوبة" }, { status: 400 })
    }

    const existingUser = await prisma.user.findFirst({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json({ error: "المستخدم موجود بالفعل" }, { status: 400 })
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      }
    })

    return NextResponse.json({ message: "تم إنشاء المستخدم", userId: user.id })
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ ما" }, { status: 500 })
  }
}