import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const videoId = searchParams.get("videoId")

  const episodes = await prisma.episode.findMany({
    where: videoId ? { videoId } : undefined,
    include: { video: { select: { title: true } } },
    orderBy: [{ seasonNumber: "asc" }, { episodeNumber: "asc" }],
  })

  return NextResponse.json(episodes)
}

export async function POST(request: Request) {
  try {
    const data = await request.json()

    const episode = await prisma.episode.create({
      data: {
        title: data.title,
        description: data.description,
        thumbnailUrl: data.thumbnailUrl,
        videoUrl: data.videoUrl,
        embedCode: data.embedCode,
        duration: parseInt(data.duration) || 0,
        episodeNumber: parseInt(data.episodeNumber),
        seasonNumber: parseInt(data.seasonNumber),
        videoId: data.videoId,
      },
    })

    return NextResponse.json(episode)
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ ما" }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { id, ...data } = await request.json()

    const episode = await prisma.episode.update({
      where: { id },
      data: {
        ...data,
        duration: data.duration ? parseInt(data.duration) : 0,
        episodeNumber: data.episodeNumber ? parseInt(data.episodeNumber) : undefined,
        seasonNumber: data.seasonNumber ? parseInt(data.seasonNumber) : undefined,
      },
    })

    return NextResponse.json(episode)
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ ما" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json()
    await prisma.episode.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ ما" }, { status: 500 })
  }
}