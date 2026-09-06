"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Film, Play, Plus, Trash, Edit, FolderOpen, X, Check } from "lucide-react"
import Link from "next/link"

type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  _count: { videos: number }
}

export default function CategoriesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [categories, setCategories] = useState<Category[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [form, setForm] = useState({ name: "", slug: "", description: "" })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (status === "loading") return

    const checkAdmin = async () => {
      try {
        const res = await fetch("/api/auth/session")
        const data = await res.json()
        if (data.isAdmin) {
          setIsAdmin(true)
        } else {
          router.push("/auth/signin")
        }
      } catch (error) {
        router.push("/auth/signin")
      } finally {
        setCheckingAuth(false)
      }
    }

    if (session?.user?.role === "ADMIN") {
      setIsAdmin(true)
      setCheckingAuth(false)
    } else if (session) {
      checkAdmin()
    } else {
      router.push("/auth/signin")
    }
  }, [session, status, router])

  useEffect(() => {
    loadCategories()
  }, [])

  const loadCategories = async () => {
    try {
      const res = await fetch("/api/admin/categories")
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error("Error loading categories:", error)
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
        body: JSON.stringify(editingCategory ? { id: editingCategory.id, ...form } : form),
      })

      if (res.ok) {
        setShowForm(false)
        setEditingCategory(null)
        setForm({ name: "", slug: "", description: "" })
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

  if (checkingAuth || status === "loading") {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    )
  }

  if (!isAdmin || !session) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
        <div className="text-center">
          <p className="text-xl mb-4">غير مصرح بالوصول</p>
          <Button onClick={() => router.push("/auth/signin")} className="bg-red-600 hover:bg-red-700">
            تسجيل الدخول
          </Button>
        </div>
      </div>
    )
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
            <Link href="/admin/advanced/episodes" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800">
              <Play className="w-5 h-5" />
              الحلقات
            </Link>
            <Link href="/admin/advanced/categories" className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 text-white">
              <FolderOpen className="w-5 h-5" />
              الفئات
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">إدارة الفئات</h1>
            <Button onClick={() => { setShowForm(true); setEditingCategory(null); setForm({ name: "", slug: "", description: "" }); }} className="bg-red-600 hover:bg-red-700">
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
                    <p className="text-sm text-gray-400 mt-1 font-mono">{category.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => { setEditingCategory(category); setForm({ name: category.name, slug: category.slug, description: category.description || "" }); setShowForm(true); }}>
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
        </main>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">{editingCategory ? "تعديل الفئة" : "إضافة فئة جديدة"}</h2>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={saveCategory} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">اسم الفئة *</label>
                <Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Slug *</label>
                <Input required value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="action-movies" className="bg-gray-800 border-gray-700 text-white" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">الوصف</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="bg-red-600 hover:bg-red-700" disabled={loading}>
                  <Check className="w-4 h-4 ml-2" />
                  {editingCategory ? "تحديث" : "إضافة"}
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