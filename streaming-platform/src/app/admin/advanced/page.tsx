"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Film,
  Plus,
  Search,
  Edit,
  Trash,
  Tv,
  Play,
  Settings,
  Users,
  BarChart,
  FolderOpen,
  Save,
  X,
  Check,
  Image,
  Link as LinkIcon,
  Eye,
  Calendar,
  Star,
  Tag,
  Layers,
  Upload,
  Download,
  FileJson,
} from "lucide-react"

type Video = {
  id: string
  title: string
  type: string
  thumbnailUrl: string | null
  videoUrl: string
  embedCode: string | null
  isPublished: boolean
  views: number
  createdAt: string
  category: { name: string } | null
  episodes: { id: string }[]
}

type Category = {
  id: string
  name: string
  slug: string
  _count: { videos: number }
}

export default function AdvancedAdmin() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("videos")

  useEffect(() => {
    if (status === "loading") return
    if (!session || session.user?.role !== "ADMIN") {
      router.push("/dashboard")
    }
  }, [session, status, router])
  const [videos, setVideos] = useState<Video[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [siteSettings, setSiteSettings] = useState({
    siteName: "ستريم إكس",
    siteDescription: "منصة بث الأفلام والمسلسلات",
    primaryColor: "#dc2626",
    logoUrl: "",
    seoTitle: "ستريم إكس",
    seoDescription: "شاهد الأفلام والمسلسلات أونلاين",
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [showVideoForm, setShowVideoForm] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [editingVideo, setEditingVideo] = useState<Video | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(false)

  const [videoForm, setVideoForm] = useState({
    title: "",
    description: "",
    thumbnailUrl: "",
    videoUrl: "",
    embedCode: "",
    type: "movie",
    genre: "",
    rating: "",
    releaseYear: "",
    maturityRating: "",
    isPublished: true,
    categoryId: "",
  })

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    description: "",
  })

  useEffect(() => {
    loadVideos()
    loadCategories()
    loadSettings()
  }, [])

  const loadVideos = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/admin/videos?limit=50")
      const data = await res.json()
      setVideos(data.videos || [])
    } catch (error) {
      console.error("Error loading videos:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories")
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error("Error loading categories:", error)
    }
  }

  const loadSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings")
      const data = await res.json()
      if (Object.keys(data).length > 0) {
        setSiteSettings({
          siteName: data.siteName || siteSettings.siteName,
          siteDescription: data.siteDescription || siteSettings.siteDescription,
          primaryColor: data.primaryColor || siteSettings.primaryColor,
          logoUrl: data.logoUrl || siteSettings.logoUrl,
          seoTitle: data.seoTitle || siteSettings.seoTitle,
          seoDescription: data.seoDescription || siteSettings.seoDescription,
        })
      }
    } catch (error) {
      console.error("Error loading settings:", error)
    }
  }

  const saveVideo = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingVideo ? `/api/admin/videos` : "/api/admin/videos"
      const method = editingVideo ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingVideo ? { id: editingVideo.id, ...videoForm } : videoForm),
      })

      if (res.ok) {
        setShowVideoForm(false)
        setEditingVideo(null)
        setVideoForm({
          title: "",
          description: "",
          thumbnailUrl: "",
          videoUrl: "",
          embedCode: "",
          type: "movie",
          genre: "",
          rating: "",
          releaseYear: "",
          maturityRating: "",
          isPublished: true,
          categoryId: "",
        })
        loadVideos()
      }
    } catch (error) {
      console.error("Error saving video:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteVideo = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذا الفيديو؟")) return

    try {
      await fetch("/api/admin/videos", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      loadVideos()
    } catch (error) {
      console.error("Error deleting video:", error)
    }
  }

  const saveCategory = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = editingCategory ? "/api/admin/categories" : "/api/admin/categories"
      const method = editingCategory ? "PUT" : "POST"

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCategory ? { id: editingCategory.id, ...categoryForm } : categoryForm),
      })

      if (res.ok) {
        setShowCategoryForm(false)
        setEditingCategory(null)
        setCategoryForm({ name: "", slug: "", description: "" })
        loadCategories()
      }
    } catch (error) {
      console.error("Error saving category:", error)
    } finally {
      setLoading(false)
    }
  }

  const deleteCategory = async (id: string) => {
    if (!confirm("هل أنت متأكد من حذف هذه الفئة؟")) return

    try {
      await fetch("/api/admin/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      })
      loadCategories()
    } catch (error) {
      console.error("Error deleting category:", error)
    }
  }

  const saveSettings = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(siteSettings),
      })
      alert("تم حفظ الإعدادات بنجاح")
    } catch (error) {
      console.error("Error saving settings:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredVideos = videos.filter(
    (v) =>
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.type.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (status === "loading" || !session || session.user?.role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="flex">
        <aside className="w-64 bg-gray-900 min-h-screen p-4">
          <div className="text-2xl font-bold text-red-600 mb-8">لوحة التحكم</div>
          <nav className="space-y-2">
            <button
              onClick={() => setActiveTab("videos")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeTab === "videos" ? "bg-red-600 text-white" : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              <Film className="w-5 h-5" />
              الفيديوهات
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeTab === "categories" ? "bg-red-600 text-white" : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              <FolderOpen className="w-5 h-5" />
              الفئات
            </button>
            <button
              onClick={() => setActiveTab("import")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeTab === "import" ? "bg-red-600 text-white" : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              <Upload className="w-5 h-5" />
              استيراد
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeTab === "settings" ? "bg-red-600 text-white" : "text-gray-400 hover:bg-gray-800"
              }`}
            >
              <Settings className="w-5 h-5" />
              إعدادات الموقع
            </button>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          {activeTab === "videos" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">إدارة الفيديوهات</h1>
                <Button onClick={() => { setShowVideoForm(true); setEditingVideo(null); setVideoForm({ title: "", description: "", thumbnailUrl: "", videoUrl: "", embedCode: "", type: "movie", genre: "", rating: "", releaseYear: "", maturityRating: "", isPublished: true, categoryId: "" }); }} className="bg-red-600 hover:bg-red-700">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة فيديو
                </Button>
              </div>

              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="بحث عن فيديو..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10 bg-gray-800 border-gray-700 text-white"
                  />
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-800">
                    <tr>
                      <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">العنوان</th>
                      <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">النوع</th>
                      <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">الفئة</th>
                      <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">الحالة</th>
                      <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">المشاهدات</th>
                      <th className="text-right px-6 py-3 text-sm font-medium text-gray-400">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {filteredVideos.map((video) => (
                      <tr key={video.id}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {video.thumbnailUrl && (
                              <img src={video.thumbnailUrl} alt={video.title} className="w-16 h-10 object-cover rounded" />
                            )}
                            <div>
                              <div className="font-medium">{video.title}</div>
                              <div className="text-sm text-gray-400">
                                {video.type === "series" ? `${video.episodes.length} حلقة` : "فيلم"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-1 text-sm">
                            {video.type === "series" ? <Tv className="w-4 h-4" /> : <Film className="w-4 h-4" />}
                            {video.type === "series" ? "مسلسل" : "فيلم"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">{video.category?.name || "-"}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-xs ${video.isPublished ? "bg-green-900/50 text-green-300" : "bg-yellow-900/50 text-yellow-300"}`}>
                            {video.isPublished ? "منشور" : "مسودة"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-400">{video.views.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" onClick={() => { setEditingVideo(video); setVideoForm({ title: video.title, description: video.description || "", thumbnailUrl: video.thumbnailUrl || "", videoUrl: video.videoUrl, embedCode: video.embedCode || "", type: video.type, genre: video.genre || "", rating: video.rating || "", releaseYear: video.releaseYear?.toString() || "", maturityRating: video.maturityRating || "", isPublished: video.isPublished, categoryId: video.categoryId || "" }); setShowVideoForm(true); }} className="text-blue-600">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => deleteVideo(video.id)} className="text-red-600">
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "categories" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold">إدارة الفئات</h1>
                <Button onClick={() => { setShowCategoryForm(true); setEditingCategory(null); setCategoryForm({ name: "", slug: "", description: "" }); }} className="bg-red-600 hover:bg-red-700">
                  <Plus className="w-4 h-4 ml-2" />
                  إضافة فئة
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <div key={category.id} className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold">{category.name}</h3>
                        <p className="text-sm text-gray-400 mt-1">{category.slug}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => { setEditingCategory(category); setCategoryForm({ name: category.name, slug: category.slug, description: category.description || "" }); setShowCategoryForm(true); }}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => deleteCategory(category.id)} className="text-red-600">
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-400">{category._count.videos} فيديو</span>
                      <span className="text-gray-500">{category.description || "لا يوجد وصف"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

      {activeTab === "settings" && (
        <div>
          <h1 className="text-3xl font-bold mb-6">إعدادات الموقع</h1>
          <form onSubmit={saveSettings} className="max-w-2xl space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">اسم الموقع</label>
              <Input value={siteSettings.siteName} onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })} className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">وصف الموقع</label>
              <Input value={siteSettings.siteDescription} onChange={(e) => setSiteSettings({ ...siteSettings, siteDescription: e.target.value })} className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">اللون الرئيسي</label>
              <div className="flex items-center gap-3">
                <input type="color" value={siteSettings.primaryColor} onChange={(e) => setSiteSettings({ ...siteSettings, primaryColor: e.target.value })} className="h-10 w-20 rounded cursor-pointer" />
                <Input value={siteSettings.primaryColor} onChange={(e) => setSiteSettings({ ...siteSettings, primaryColor: e.target.value })} className="bg-gray-800 border-gray-700 text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">رابط الشعار</label>
              <Input value={siteSettings.logoUrl} onChange={(e) => setSiteSettings({ ...siteSettings, logoUrl: e.target.value })} placeholder="https://example.com/logo.png" className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">عنوان SEO</label>
              <Input value={siteSettings.seoTitle} onChange={(e) => setSiteSettings({ ...siteSettings, seoTitle: e.target.value })} className="bg-gray-800 border-gray-700 text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">وصف SEO</label>
              <textarea value={siteSettings.seoDescription} onChange={(e) => setSiteSettings({ ...siteSettings, seoDescription: e.target.value })} rows={3} className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" />
            </div>
            <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={loading}>
              <Save className="w-4 h-4 ml-2" />
              حفظ الإعدادات
            </Button>
          </form>
        </div>
      )}

      {activeTab === "import" && (
        <ImportTab categories={categories} onImportComplete={loadVideos} />
      )}
        </main>
      </div>

      {showVideoForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{editingVideo ? "تعديل الفيديو" : "إضافة فيديو جديد"}</h2>
              <button onClick={() => setShowVideoForm(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={saveVideo} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">عنوان الفيديو *</label>
                  <Input required value={videoForm.title} onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })} className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">النوع</label>
                  <select value={videoForm.type} onChange={(e) => setVideoForm({ ...videoForm, type: e.target.value })} className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white">
                    <option value="movie">فيلم</option>
                    <option value="series">مسلسل</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">الوصف</label>
                  <textarea value={videoForm.description} onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })} rows={3} className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">رابط الصورة المصغرة</label>
                  <Input value={videoForm.thumbnailUrl} onChange={(e) => setVideoForm({ ...videoForm, thumbnailUrl: e.target.value })} placeholder="https://example.com/image.jpg" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">رابط الفيديو</label>
                  <Input value={videoForm.videoUrl} onChange={(e) => setVideoForm({ ...videoForm, videoUrl: e.target.value })} placeholder="https://example.com/video.mp4" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">كود Embed</label>
                  <textarea value={videoForm.embedCode} onChange={(e) => setVideoForm({ ...videoForm, embedCode: e.target.value })} rows={3} placeholder='<iframe src="..." />' className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white font-mono" />
                  <p className="text-xs text-gray-400 mt-1">يمكنك وضع كود iframe هنا بدلاً من رابط الفيديو المباشر</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">المدة (دقائق)</label>
                  <Input type="number" value={videoForm.duration} onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })} className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">التقييم</label>
                  <Input value={videoForm.rating} onChange={(e) => setVideoForm({ ...videoForm, rating: e.target.value })} placeholder="9.5" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">سنة الإصدار</label>
                  <Input value={videoForm.releaseYear} onChange={(e) => setVideoForm({ ...videoForm, releaseYear: e.target.value })} placeholder="2024" className="bg-gray-800 border-gray-700 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">تصنيف العمري</label>
                  <select value={videoForm.maturityRating} onChange={(e) => setVideoForm({ ...videoForm, maturityRating: e.target.value })} className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white">
                    <option value="">بدون</option>
                    <option value="G">G</option>
                    <option value="PG">PG</option>
                    <option value="PG-13">PG-13</option>
                    <option value="R">R</option>
                    <option value="NC-17">NC-17</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">الفئة</label>
                  <select value={videoForm.categoryId} onChange={(e) => setVideoForm({ ...videoForm, categoryId: e.target.value })} className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white">
                    <option value="">بدون فئة</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isPublished" checked={videoForm.isPublished} onChange={(e) => setVideoForm({ ...videoForm, isPublished: e.target.checked })} className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-red-600" />
                  <label htmlFor="isPublished" className="text-sm">منشور</label>
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={loading}>
                  <Check className="w-4 h-4 ml-2" />
                  {editingVideo ? "تحديث" : "إضافة"}
                </Button>
                <Button type="button" onClick={() => setShowVideoForm(false)} variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
                  إلغاء
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCategoryForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{editingCategory ? "تعديل الفئة" : "إضافة فئة جديدة"}</h2>
              <button onClick={() => setShowCategoryForm(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={saveCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">اسم الفئة *</label>
                <Input required value={categoryForm.name} onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })} className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Slug *</label>
                <Input required value={categoryForm.slug} onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })} placeholder="action-movies" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">الوصف</label>
                <textarea value={categoryForm.description} onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })} rows={3} className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={loading}>
                  <Check className="w-4 h-4 ml-2" />
                  {editingCategory ? "تحديث" : "إضافة"}
                </Button>
                <Button type="button" onClick={() => setShowCategoryForm(false)} variant="outline" className="border-gray-700 text-white hover:bg-gray-800">
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

function ImportTab({ categories, onImportComplete }: { categories: Category[]; onImportComplete: () => void }) {
  const [importType, setImportType] = useState("movie")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [jsonInput, setJsonInput] = useState("")
  const [importResult, setImportResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleImport = async () => {
    setLoading(true)
    setImportResult(null)

    try {
      let items: any[] = []

      try {
        items = JSON.parse(jsonInput)
        if (!Array.isArray(items)) throw new Error()
      } catch {
        setImportResult({ error: "صيغة JSON غير صحيحة" })
        setLoading(false)
        return
      }

      const res = await fetch("/api/admin/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, categoryId: selectedCategory, type: importType }),
      })

      const result = await res.json()
      setImportResult(result)

      if (result.imported > 0) {
        onImportComplete()
      }
    } catch (error) {
      setImportResult({ error: "حدث خطأ أثناء الاستيراد" })
    } finally {
      setLoading(false)
    }
  }

  const sampleJson = [
    {
      title: "فيلم تجريبي",
      description: "وصف الفيلم التجريبي",
      thumbnail: "https://example.com/poster.jpg",
      videoUrl: "https://example.com/video.mp4",
      embed: '<iframe src="https://example.com/embed" width="100%" height="100%" frameborder="0" allowfullscreen></iframe>',
      duration: 120,
      type: "movie",
      genre: "أكشن",
      rating: "8.5",
      releaseYear: 2024,
      maturityRating: "PG-13"
    }
  ]

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">استيراد المحتوى</h1>
      <div className="max-w-4xl space-y-6">
        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <h3 className="text-xl font-semibold mb-4">إعدادات الاستيراد</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">نوع المحتوى</label>
              <select value={importType} onChange={(e) => setImportType(e.target.value)} className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white">
                <option value="movie">أفلام</option>
                <option value="series">مسلسلات</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">الفئة (اختياري)</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white">
                <option value="">بدون فئة</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">بيانات JSON</h3>
            <Button onClick={() => setJsonInput(JSON.stringify(sampleJson, null, 2))} variant="outline" size="sm" className="border-gray-700 text-white hover:bg-gray-800">
              <Download className="w-4 h-4 ml-2" />
              تحميل مثال
            </Button>
          </div>
          <textarea
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            rows={12}
            placeholder='[{"title": "فيلم تجريبي", "description": "وصف الفيلم", "thumbnail": "https://...", "videoUrl": "https://...", "embed": "<iframe>...</iframe>", "duration": 120, "type": "movie", "genre": "أكشن", "rating": "8.5", "releaseYear": 2024}]'
            className="w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-3 text-sm text-white font-mono"
          />
          <p className="text-xs text-gray-400 mt-2">
            أدخل مصفوفة من كائنات JSON. كل كائن يمثل فيلم أو مسلسل واحد.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button onClick={handleImport} className="bg-red-600 hover:bg-red-700" disabled={loading || !jsonInput}>
            <Upload className="w-4 h-4 ml-2" />
            {loading ? "جاري الاستيراد..." : "استيراد الآن"}
          </Button>
        </div>

        {importResult && (
          <div className={`rounded-lg p-6 border ${importResult.error ? "bg-red-900/20 border-red-700" : "bg-green-900/20 border-green-700"}`}>
            <h4 className="text-lg font-semibold mb-2">{importResult.error ? "خطأ" : "نتيجة الاستيراد"}</h4>
            {importResult.error ? (
              <p className="text-red-300">{importResult.error}</p>
            ) : (
              <div className="space-y-2">
                <p className="text-green-300">تم استيراد {importResult.imported} عنصر بنجاح</p>
                {importResult.failed > 0 && (
                  <div>
                    <p className="text-yellow-300">فشل استيراد {importResult.failed} عنصر:</p>
                    <ul className="list-disc list-inside text-sm text-yellow-200 mt-2">
                      {importResult.errors.map((err: string, i: number) => (
                        <li key={i}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}