import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const videoId = searchParams.get("videoId")
  const userId = searchParams.get("userId")

  const where: any = {}
  if (videoId) where.videoId = videoId
  if (userId) where.userId = userId

  const history = await prisma.watchHistory.findMany({
    where,
    include: {
      video: {
        select: {
          id: true,
          title: true,
          thumbnailUrl: true,
          type: true,
          duration: true,
        },
      },
    },
    orderBy: { watchedAt: "desc" },
  })

  return NextResponse.json(history)
}

export async function POST(request: Request) {
  try {
    const { userId, videoId, progress } = await request.json()

    if (!userId || !videoId) {
      return NextResponse.json({ error: "userId and videoId required" }, { status: 400 })
    }

    const history = await prisma.watchHistory.upsert({
      where: {
        userId_videoId: {
          userId,
          videoId,
        },
      },
      update: {
        progress: progress || 0,
        watchedAt: new Date(),
      },
      create: {
        userId,
        videoId,
        progress: progress || 0,
      },
    })

    return NextResponse.json(history)
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ ما" }, { status: 500 })
  }
}