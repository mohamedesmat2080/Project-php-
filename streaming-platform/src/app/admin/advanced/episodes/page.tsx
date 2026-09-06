"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Play, Tv, Film, Search, Plus, Trash, Edit, ChevronLeft } from "lucide-react"
import Link from "next/link"

type Episode = {
  id: string
  title: string
  description: string | null
  thumbnailUrl: string | null
  videoUrl: string
  embedCode: string | null
  duration: number
  episodeNumber: number
  seasonNumber: number
  video: { title: string }
}

type VideoOption = {
  id: string
  title: string
  type: string
}

export default function EpisodesPage() {
  const [episodes, setEpisodes] = useState<Episode[]>([])
  const [videos, setVideos] = useState<VideoOption[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingEpisode, setEditingEpisode] = useState<Episode | null>(null)
  const [form, setForm] = useState({ title: "", description: "", thumbnailUrl: "", videoUrl: "", embedCode: "", duration: "", episodeNumber: "", seasonNumber: "1", videoId: "" })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadEpisodes()
    loadVideos()
  }, [])

  const loadEpisodes = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/episodes")
      const data = await res.json()
      setEpisodes(data)
    } catch (error) {
      console.error("Error loading episodes:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadVideos = async () => {
    try {
      const res = await fetch("/api/admin/videos?limit=1000")
      const data = await res.json()
      const seriesVideos = (data.videos || []).filter((v: any) => v.type === "series")
      setVideos(seriesVideos.map((v: any) => ({ id: v.id, title: v.title, type: v.type })))
    } catch (error) {
      console.error("Error loading videos:", error)
    }
  }

  const saveEpisode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingEpisode ? "/api/admin/episodes" : "/api/admin/episodes"
      const method = editingEpisode ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingEpisode ? { id: editingEpisode.id, ...form } : form),
      })

      if (res.ok) {
        setShowForm(false)
        setEditingEpisode(null)
        setForm({ title: "", description: "", thumbnailUrl: "", videoUrl: "", embedCode: "", duration: "", episodeNumber: "", seasonNumber: "1", videoId: "" })
        loadEpisodes()
      }
    } catch (error) {
      console.error("Error saving episode:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteEpisode = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الحلقة؟")) return

    try {
      await fetch("/api/admin/episodes", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      loadEpisodes()
    } catch (error) {
      console.error("Error deleting episode:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex">
        <aside className="w-64 bg-gray-900 min-h-screen p-4">
          <Link href="/admin/advanced" className="text-2xl font-bold text-red-600 mb-8 block">لوحة التحكم</Link>
          <nav className="space-y-2">
            <Link href="/admin/advanced" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800">
              <Film className="w-5 h-5" />
              الفيديوهات
            </Link>
            <Link href="/admin/advanced/episodes" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 text-white">
              <Tv className="w-5 h-5" />
              الحلقات
            </Link>
            <Link href="/admin/advanced/categories" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800">
              <Play className="w-5 h-5" />
              الفئات
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">إدارة الحلقات</h1>
            <Button onClick={() => { setShowForm(true); setEditingEpisode(null); setForm({ title: "", description: "", thumbnailUrl: "", videoUrl: "", embedCode: "", duration: "", episodeNumber: "", seasonNumber: "1", videoId: "" }); }} className="bg-red-600 hover:bg-red-700">
              <Plus className="w-4 h-4 ml-2" />
              إضافة حلقة
            </Button>
          </div>

          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">المسلسل</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">الحلقة</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">الموسم</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">العنوان</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">المدة</th>
                  <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {episodes.map((episode) => (
                  <tr key={episode.id}>
                    <td className="px-6 py-4 text-sm">{episode.video.title}</td>
                    <td className="px-6 py-4 text-sm">ح{episode.episodeNumber}</td>
                    <td className="px-6 py-4 text-sm">م{episode.seasonNumber}</td>
                    <td className="px-6 py-4 text-sm">{episode.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-400">{episode.duration} دقيقة</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => { setEditingEpisode(episode); setForm({ title: episode.title, description: episode.description || "", thumbnailUrl: episode.thumbnailUrl || "", videoUrl: episode.videoUrl, embedCode: episode.embedCode || "", duration: episode.duration.toString(), episodeNumber: episode.episodeNumber.toString(), seasonNumber: episode.seasonNumber.toString(), videoId: episode.video.title }); setShowForm(true); }} className="text-blue-600">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteEpisode(episode.id)} className="text-red-600">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{editingEpisode ? "تعديل الحلقة" : "إضافة حلقة جديدة"}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={saveEpisode} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">المسلسل *</label>
                <select required value={form.videoId} onChange={(e) => setForm({ ...form, videoId: e.target.value })} className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white">
                  <option value="">اختر مسلسل</option>
                  {videos.map((v) => (
                    <option key={v.id} value={v.title}>{v.title}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">عنوان الحلقة *</label>
                  <Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">رقم الحلقة *</label>
                  <Input type="number" required value={form.episodeNumber} onChange={(e) => setForm({ ...form, episodeNumber: e.target.value })} className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">رقم الموسم *</label>
                  <Input type="number" required value={form.seasonNumber} onChange={(e) => setForm({ ...form, seasonNumber: e.target.value })} className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">المدة (دقائق)</label>
                  <Input type="number" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="bg-gray-800 border-gray-700 text-white" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">الوصف</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">رابط الصورة المصغرة</label>
                <Input value={form.thumbnailUrl} onChange={(e) => setForm({ ...form, thumbnailUrl: e.target.value })} className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">رابط الفيديو</label>
                <Input value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">كود Embed</label>
                <textarea value={form.embedCode} onChange={(e) => setForm({ ...form, embedCode: e.target.value })} rows={3} className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white font-mono" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={loading}>
                  <Check className="w-4 h-4 ml-2" />
                  {editingEpisode ? "تحديث" : "إضافة"}
                </Button>
                <Button type="button" onClick={() => setShowForm(false)} variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                  إلغاء
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}