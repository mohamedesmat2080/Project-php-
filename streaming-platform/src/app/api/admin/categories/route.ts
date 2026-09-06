import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET() {
  const categories = await prisma.category.findMany({
    include: { _count: { select: { videos: true } } },
    orderBy: { name: "asc" },
  })
  return NextResponse.json(categories)
}

export async function POST(request: Request) {
  try {
    const { name, description, slug } = await request.json()

    if (!name || !slug) {
      return NextResponse.json({ error: "الاسم وال slug مطلوبان" }, { status: 400 })
    }

    const category = await prisma.category.create({
      data: { name, description, slug },
    })

    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ ما" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, name, description, slug, isActive } = await request.json()

    const category = await prisma.category.update({
      where: { id },
      data: { name, description, slug, isActive },
    })

    return NextResponse.json(category)
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ ما" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await prisma.category.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ ما" }, { status: 500 })
  }
}