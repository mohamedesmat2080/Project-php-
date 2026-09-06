import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get("page") || "1")
  const limit = parseInt(searchParams.get("limit") || "10")
  const search = searchParams.get("search") || ""
  const type = searchParams.get("type") || ""

  const skip = (page - 1) * limit

  const where = {
    ...(search && {
      OR: [
        { title: { contains: search } },
        { description: { contains: search } },
      ],
    }),
    ...(type && { type }),
  }

  const [videos, total] = await Promise.all([
    prisma.video.findMany({
      where,
      include: { category: true, episodes: true },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.video.count({ where }),
  ])

  return NextResponse.json({
    videos,
    total,
    pages: Math.ceil(total / limit),
    currentPage: page,
  })
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const video = await prisma.video.create({
      data: {
        title: data.title,
        description: data.description,
        thumbnailUrl: data.thumbnailUrl,
        videoUrl: data.videoUrl,
        embedCode: data.embedCode,
        duration: parseInt(data.duration) || 0,
        type: data.type,
        genre: data.genre,
        rating: data.rating,
        releaseYear: data.releaseYear ? parseInt(data.releaseYear) : null,
        maturityRating: data.maturityRating,
        isPublished: data.isPublished || false,
        categoryId: data.categoryId,
      },
      include: { category: true },
    })

    return NextResponse.json(video)
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ ما" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json()

    const video = await prisma.video.update({
      where: { id },
      data: {
        ...data,
        releaseYear: data.releaseYear ? parseInt(data.releaseYear) : null,
        duration: data.duration ? parseInt(data.duration) : 0,
      },
      include: { category: true },
    })

    return NextResponse.json(video)
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ ما" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await prisma.video.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ ما" }, { status: 500 })
  }
}