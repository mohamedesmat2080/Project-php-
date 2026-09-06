"use client"

import { useSearchParams } from "next/navigation"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, ThumbsUp, ThumbsDown, ListPlus } from "lucide-react"

function VideoPlayer() {
  const searchParams = useSearchParams()
  const videoId = searchParams.get("v")

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-semibold">عنوان الفيلم</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white">
              <ThumbsUp className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <ThumbsDown className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <ListPlus className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <main className="pt-20">
        <div className="aspect-video bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl text-gray-400 mb-4">مشغل الفيديو</p>
            <p className="text-gray-500">معرف الفيديو: {videoId || "غير محدد"}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">عنوان الفيلم</h1>
          <div className="flex items-center gap-4 text-gray-400 mb-6">
            <span>2024</span>
            <span>•</span>
            <span>ساعتين و 15 دقيقة</span>
            <span>•</span>
            <span className="px-2 py-1 border border-gray-600 rounded text-xs">4K</span>
            <span className="px-2 py-1 border border-gray-600 rounded text-xs">HDR</span>
          </div>
          <p className="text-gray-300 leading-relaxed">
            هذا وصف تجريبي للفيديو. في التطبيق الحقيقي، سيحتوي على معلومات تفصيلية
            عن الفيلم أو المسلسل، بما في ذلك القصة، الممثلين، المخرج، وتفاصيل أخرى ذات صلة.
          </p>
        </div>
      </main>
    </div>
  )
}

export default function WatchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">جاري التحميل...</div>}>
      <VideoPlayer />
    </Suspense>
  )
}