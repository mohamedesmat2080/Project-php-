"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Film, Tv, Search, Play, Upload, Download, X, ChevronLeft } from "lucide-react"
import Link from "next/link"

type Video = {
  id: string
  title: string
  description: string | null
  thumbnailUrl: string | null
  type: string
  rating: string | null
  releaseYear: number | null
  views: number
  isPublished: boolean
  category: { name: string } | null
  episodes: { id: string }[]
}

export default function BrowsePage() {
  const [videos, setVideos] = useState<Video[]>([])
  const [filteredVideos, setFilteredVideos] = useState<Video[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadVideos()
  }, [])

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
      setFilteredVideos(data.videos || [])
    } catch (error) {
      console.error("Error loading videos:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-red-600">
            ستريم إكس
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-white">تسجيل الدخول</Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="pt-24 px-4">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="بحث عن فيلم أو مسلسل..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-10 bg-gray-900 border-gray-800 text-white"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={() => setSelectedType("all")} variant={selectedType === "all" ? "default" : "ghost"} className={selectedType === "all" ? "bg-red-600" : "text-white"}>
                الكل
              </Button>
              <Button onClick={() => setSelectedType("movie")} variant={selectedType === "movie" ? "default" : "ghost"} className={selectedType === "movie" ? "bg-red-600" : "text-white"}>
                أفلام
              </Button>
              <Button onClick={() => setSelectedType("series")} variant={selectedType === "series" ? "default" : "ghost"} className={selectedType === "series" ? "bg-red-600" : "text-white"}>
                مسلسلات
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20 text-gray-400">جاري التحميل...</div>
          ) : filteredVideos.length === 0 ? (
            <div className="text-center py-20 text-gray-400">لا توجد نتائج</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setSelectedVideo(video)}
                  className="group cursor-pointer"
                >
                  <div className="aspect-video bg-gray-900 rounded-lg mb-2 relative overflow-hidden">
                    {video.thumbnailUrl ? (
                      <img src={video.thumbnailUrl} alt={video.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        {video.type === "series" ? <Tv className="w-12 h-12 text-gray-600" /> : <Film className="w-12 h-12 text-gray-600" />}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-16 h-16 text-white" />
                    </div>
                    {video.rating && (
                      <div className="absolute top-2 left-2 bg-yellow-600 text-black text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                        ★ {video.rating}
                      </div>
                    )}
                    {video.type === "series" && (
                      <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                        <Tv className="w-3 h-3" />
                        {video.episodes.length}
                      </div>
                    )}
                  </div>
                  <h3 className="font-medium truncate">{video.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{video.releaseYear || "-"}</span>
                    <span>{video.category?.name || "-"}</span>
                  </div>
                </div>
              ))}
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
                <X className="w-6 h-6" />
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

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-gray-400">
                  {selectedVideo.releaseYear && <span className="flex items-center gap-1"><span className="text-gray-500">سنة الإصدار:</span> {selectedVideo.releaseYear}</span>}
                  {selectedVideo.rating && <span className="flex items-center gap-1">★ {selectedVideo.rating}</span>}
                  <span className="flex items-center gap-1"><span className="text-gray-500">المشاهدات:</span> {selectedVideo.views.toLocaleString()}</span>
                  <span className="flex items-center gap-1"><span className="text-gray-500">النوع:</span> {selectedVideo.type === "series" ? "مسلسل" : "فيلم"}</span>
                </div>

                {selectedVideo.description && (
                  <p className="text-gray-300 leading-relaxed">{selectedVideo.description}</p>
                )}

                {selectedVideo.type === "series" && selectedVideo.episodes.length > 0 && (
                  <div>
                    <h3 className="text-xl font-bold mb-4">الحلقات</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {selectedVideo.episodes.map((episode, index) => (
                        <div key={episode.id} className="bg-gray-800 rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:bg-gray-700">
                          <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                            <Play className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">الحلقة {index + 1}</p>
                            <p className="text-sm text-gray-400">مشاهدة</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}