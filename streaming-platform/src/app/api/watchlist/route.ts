import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "userId required" }, { status: 400 })
  }

  const watchlist = await prisma.watchlist.findMany({
    where: { userId },
    include: {
      video: {
        select: {
          id: true,
          title: true,
          description: true,
          thumbnailUrl: true,
          type: true,
          rating: true,
          releaseYear: true,
          views: true,
          category: { select: { name: true } },
          episodes: { select: { id: true } },
        },
      },
    },
    orderBy: { addedAt: "desc" },
  })

  return NextResponse.json(watchlist)
}

export async function POST(request: Request) {
  try {
    const { userId, videoId } = await request.json()

    if (!userId || !videoId) {
      return NextResponse.json({ error: "userId and videoId required" }, { status: 400 })
    }

    const item = await prisma.watchlist.create({
      data: { userId, videoId },
    })

    return NextResponse.json(item)
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ ما" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { userId, videoId } = await request.json()

    if (!userId || !videoId) {
      return NextResponse.json({ error: "userId and videoId required" }, { status: 400 })
    }

    await prisma.watchlist.delete({
      where: {
        userId_videoId: {
          userId,
          videoId,
        },
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ ما" }, { status: 500 })
  }
}