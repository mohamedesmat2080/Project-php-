"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Tv, Film, Search, ChevronLeft, ListPlus, Check } from "lucide-react"

type Video = {
  id: string
  title: string
  description: string | null
  thumbnailUrl: string | null
  type: string
  rating: string | null
  releaseYear: number | null
  views: number
  videoUrl: string
  embedCode: string | null
  category: { name: string } | null
}

export default function WatchPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [video, setVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const videoId = window.location.hash.replace("#", "")
    if (videoId) {
      loadVideo(videoId)
    }
  }, [])

  const loadVideo = async (id: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/videos`)
      const data = await res.json()
      const found = data.videos?.find((v: Video) => v.id === id)
      if (found) {
        setVideo(found)
      }
    } catch (error) {
      console.error("Error loading video:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleTimeUpdate = () => {
    if (!video || !session?.user?.id) return
    const videoEl = document.querySelector("video")
    if (videoEl) {
      const current = videoEl.currentTime
      const duration = videoEl.duration || 1
      const percent = Math.round((current / duration) * 100)
      setProgress(percent)

      fetch("/api/watch-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id, videoId: video.id, progress: percent }),
      }).catch(() => {})
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>جاري تحميل الفيديو...</p>
        </div>
      </div>
    )
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <Film className="w-20 h-20 text-gray-600 mx-auto mb-4" />
          <p className="text-xl mb-4">الفيديو غير موجود</p>
          <Link href="/dashboard">
            <Button className="bg-red-600 hover:bg-red-700">العودة للرئيسية</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="icon" className="text-white">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">{video.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">{progress}% مكتمل</span>
          </div>
        </div>
      </div>

      <main className="pt-20">
        <div className="aspect-video bg-gray-900">
          {video.embedCode ? (
            <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: video.embedCode }} />
          ) : video.videoUrl ? (
            <video
              controls
              autoPlay
              className="w-full h-full"
              poster={video.thumbnailUrl || ""}
              onTimeUpdate={handleTimeUpdate}
            >
              <source src={video.videoUrl} type="video/mp4" />
              متصفحك لا يدعم تشغيل الفيديو
            </video>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <Film className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">لا يوجد رابط فيديو متاح</p>
              </div>
            </div>
          )}
        </div>

        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">{video.title}</h1>
          <div className="flex items-center gap-4 text-gray-400 mb-6">
            {video.releaseYear && <span>سنة الإصدار: {video.releaseYear}</span>}
            {video.rating && <span>★ {video.rating}</span>}
            <span>المشاهدات: {video.views.toLocaleString()}</span>
            <span>النوع: {video.type === "series" ? "مسلسل" : "فيلم"}</span>
          </div>
          {video.description && (
            <p className="text-gray-300 leading-relaxed mb-6">{video.description}</p>
          )}
        </div>
      </main>
    </div>
  )
}