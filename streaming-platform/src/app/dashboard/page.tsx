"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Tv, Film, Search, Trash, History, List, User, ChevronLeft } from "lucide-react"

type Video = {
  id: string
  title: string
  description: string | null
  thumbnailUrl: string | null
  type: string
  rating: string | null
  releaseYear: number | null
  views: number
  category: { name: string } | null
}

type WatchlistItem = {
  id: string
  video: Video
  addedAt: string
}

type WatchHistoryItem = {
  id: string
  video: {
    id: string
    title: string
    thumbnailUrl: string | null
    type: string
    duration: number
  }
  progress: number
  watchedAt: string
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("home")
  const [videos, setVideos] = useState<Video[]>([])
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [watchHistory, setWatchHistory] = useState<WatchHistoryItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.id) {
      loadVideos()
      loadWatchlist()
      loadWatchHistory()
    }
  }, [session])

  useEffect(() => {
    let filtered = videos
    if (searchQuery) {
      filtered = filtered.filter((v) => v.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }
    if (selectedType !== "all") {
      filtered = filtered.filter((v) => v.type === selectedType)
    }
    setFilteredVideos(filtered)
  }, [searchQuery, selectedType, videos])

  const loadVideos = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/videos")
      const data = await res.json()
      setVideos(data.videos || [])
    } catch (error) {
      console.error("Error loading videos:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadWatchlist = async () => {
    if (!session?.user?.id) return
    try {
      const res = await fetch(`/api/watchlist?userId=${session.user.id}`)
      const data = await res.json()
      setWatchlist(data)
    } catch (error) {
      console.error("Error loading watchlist:", error)
    }
  }

  const loadWatchHistory = async () => {
    if (!session?.user?.id) return
    try {
      const res = await fetch(`/api/watch-history?userId=${session.user.id}`)
      const data = await res.json()
      setWatchHistory(data)
    } catch (error) {
      console.error("Error loading watch history:", error)
    }
  }

  const addToWatchlist = async (videoId: string) => {
    if (!session?.user?.id) return
    try {
      await fetch("/api/watchlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id, videoId }),
      })
      loadWatchlist()
    } catch (error) {
      console.error("Error adding to watchlist:", error)
    }
  }

  const removeFromWatchlist = async (videoId: string) => {
    if (!session?.user?.id) return
    try {
      await fetch("/api/watchlist", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id, videoId }),
      })
      loadWatchlist()
    } catch (error) {
      console.error("Error removing from watchlist:", error)
    }
  }

  const updateWatchProgress = async (videoId: string, progress: number) => {
    if (!session?.user?.id) return
    try {
      await fetch("/api/watch-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id, videoId, progress }),
      })
      loadWatchHistory()
    } catch (error) {
      console.error("Error updating watch progress:", error)
    }
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>جاري التحميل...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const filteredVideos = videos.filter(
    (v) =>
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold text-red-600">
            ستريم إكس
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-white">الرئيسية</Button>
            </Link>
            <Link href="/dashboard?tab=watchlist">
              <Button variant="ghost" className="text-white">قائمتي</Button>
            </Link>
            <Link href="/dashboard?tab=history">
              <Button variant="ghost" className="text-white">السجل</Button>
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span className="text-sm">{session.user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24 px-4">
        <div className="container mx-auto">
          {activeTab === "home" && (
            <div>
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6">استكمل المشاهدة</h2>
                {watchHistory.length === 0 ? (
                  <div className="text-center py-12 text-gray-400">لا يوجد سجل مشاهدة بعد</div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {watchHistory.slice(0, 6).map((item) => (
                      <div key={item.id} className="group cursor-pointer">
                        <div className="aspect-video bg-gray-800 rounded-lg mb-2 relative overflow-hidden">
                          {item.video.thumbnailUrl ? (
                            <img src={item.video.thumbnailUrl} alt={item.video.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-800">
                              {item.video.type === "series" ? <Tv className="w-12 h-12 text-gray-600" /> : <Film className="w-12 h-12 text-gray-600" />}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Play className="w-12 h-12 text-white" />
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                            <div className="h-full bg-red-600" style={{ width: `${item.progress}%` }}></div>
                          </div>
                        </div>
                        <h3 className="font-medium truncate">{item.video.title}</h3>
                        <p className="text-sm text-gray-400">{item.progress}% مكتمل</p>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6">الأكثر شعبية</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {filteredVideos.map((video) => (
                    <div key={video.id} className="group cursor-pointer" onClick={() => setSelectedVideo(video)}>
                      <div className="aspect-video bg-gray-800 rounded-lg mb-2 relative overflow-hidden">
                        {video.thumbnailUrl ? (
                          <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-800">
                            {video.type === "series" ? <Tv className="w-12 h-12 text-gray-600" /> : <Film className="w-12 h-12 text-gray-600" />}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                        {video.rating && (
                          <div className="absolute top-2 left-2 bg-yellow-600 text-black text-xs font-bold px-2 py-1 rounded">
                            ★ {video.rating}
                          </div>
                        )}
                      </div>
                      <h3 className="font-medium truncate">{video.title}</h3>
                      <p className="text-sm text-gray-400">{video.releaseYear || "-"}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {activeTab === "watchlist" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">قائمتي</h2>
              {watchlist.length === 0 ? (
                <div className="text-center py-12 text-gray-400">لا توجد عناصر في قائمتك</div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {watchlist.map((item) => (
                    <div key={item.id} className="group cursor-pointer relative">
                      <div className="aspect-video bg-gray-800 rounded-lg mb-2 relative overflow-hidden">
                        {item.video.thumbnailUrl ? (
                          <img src={item.video.thumbnailUrl} alt={item.video.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-800">
                            {item.video.type === "series" ? <Tv className="w-12 h-12 text-gray-600" /> : <Film className="w-12 h-12 text-gray-600" />}
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </div>
                      <h3 className="font-medium truncate">{item.video.title}</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromWatchlist(item.video.id)}
                        className="text-red-600 mt-1"
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "history" && (
            <div>
              <h2 className="text-3xl font-bold mb-6">سجل المشاهدة</h2>
              {watchHistory.length === 0 ? (
                <div className="text-center py-12 text-gray-400">لا يوجد سجل مشاهدة بعد</div>
              ) : (
                <div className="space-y-4">
                  {watchHistory.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 bg-gray-900 rounded-lg p-4">
                      <div className="w-24 h-16 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                        {item.video.thumbnailUrl ? (
                          <img src={item.video.thumbnailUrl} alt={item.video.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Film className="w-8 h-8 text-gray-600" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{item.video.title}</h3>
                        <p className="text-sm text-gray-400">{item.progress}% مكتمل</p>
                      </div>
                      <div className="h-2 w-32 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-red-600" style={{ width: `${item.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">{selectedVideo.title}</h2>
              <button onClick={() => setSelectedVideo(null)} className="text-gray-400 hover:text-white">
                <ChevronLeft className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6">
              {selectedVideo.embedCode ? (
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
                  <div dangerouslySetInnerHTML={{ __html: selectedVideo.embedCode }} />
                </div>
              ) : selectedVideo.videoUrl ? (
                <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
                  <video controls autoPlay className="w-full h-full" poster={selectedVideo.thumbnailUrl || ""}>
                    <source src={selectedVideo.videoUrl} type="video/mp4" />
                    متصفحك لا يدعم تشغيل الفيديو
                  </video>
                </div>
              ) : (
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center">
                    <Film className="w-20 h-20 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">لا يوجد رابط فيديو متاح</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 mb-4">
                <Button onClick={() => addToWatchlist(selectedVideo.id)} className="bg-red-600 hover:bg-red-700">
                  <List className="w-4 h-4 ml-2" />
                  أضف لقائمتي
                </Button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-400">
                  {selectedVideo.releaseYear && <span>سنة الإصدار: {selectedVideo.releaseYear}</span>}
                  {selectedVideo.rating && <span>★ {selectedVideo.rating}</span>}
                  <span>المشاهدات: {selectedVideo.views.toLocaleString()}</span>
                  <span>النوع: {selectedVideo.type === "series" ? "مسلسل" : "فيلم"}</span>
                </div>
                {selectedVideo.description && (
                  <p className="text-gray-300 leading-relaxed">{selectedVideo.description}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}