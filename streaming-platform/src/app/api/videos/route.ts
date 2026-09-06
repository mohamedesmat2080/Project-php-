import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")
  const categoryId = searchParams.get("categoryId")
  const search = searchParams.get("search")

  const where: any = { isPublished: true }

  if (type) where.type = type
  if (categoryId) where.categoryId = categoryId
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ]
  }

  const videos = await prisma.video.findMany({
    where,
    include: { category: true, episodes: true },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json({ videos })
}