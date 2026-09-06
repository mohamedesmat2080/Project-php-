import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  const settings = await prisma.siteSettings.findMany()
  const settingsObj = settings.reduce((acc, s) => ({ ...acc, [s.key]: s.value }), {})
  return NextResponse.json(settingsObj)
}

export async function POST(request: Request) {
  try {
    const settings = await request.json()

    for (const [key, value] of Object.entries(settings)) {
      await prisma.siteSettings.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ ما" }, { status: 500 })
  }
}