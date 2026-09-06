import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const { items, categoryId, type } = await request.json()

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: "لا توجد بيانات للاستيراد" }, { status: 400 })
    }

    const results = {
      imported: 0,
      failed: 0,
      errors: [] as string[],
    }

    for (const item of items) {
      try {
        await prisma.video.create({
          data: {
            title: item.title || "بدون عنوان",
            description: item.description || null,
            thumbnailUrl: item.thumbnail || item.poster || null,
            videoUrl: item.url || item.videoUrl || "",
            embedCode: item.embed || item.embedCode || null,
            duration: item.duration || item.runtime || 0,
            type: type || item.type || "movie",
            genre: item.genre || null,
            rating: item.rating || item.imdb_rating || null,
            releaseYear: item.year || item.releaseYear || null,
            maturityRating: item.maturityRating || item.rated || null,
            isPublished: true,
            categoryId: categoryId || null,
          },
        })
        results.imported++
      } catch (error) {
        results.failed++
        results.errors.push(`فشل استيراد: ${item.title || "بدون عنوان"}`)
      }
    }

    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json({ error: "حدث خطأ أثناء الاستيراد" }, { status: 500 })
  }
}