"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { User, Settings, History, List, Film } from "lucide-react"

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("profile")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
    }
  }, [status, router])

  if (status === "loading" || !session) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>جاري التحميل...</p>
        </div>
      </div>
    )
  }

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
          </div>
        </div>
      </header>

      <main className="pt-24 px-4">
        <div className="container mx-auto">
          <div className="flex gap-8">
            <aside className="w-64 flex-shrink-0">
              <div className="bg-gray-900 rounded-lg p-6 border border-gray-800 mb-6">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10" />
                </div>
                <h2 className="text-xl font-bold text-center">{session.user?.name}</h2>
                <p className="text-gray-400 text-center text-sm">{session.user?.email}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    activeTab === "profile" ? "bg-red-600 text-white" : "text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  <User className="w-5 h-5" />
                  الملف الشخصي
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    activeTab === "settings" ? "bg-red-600 text-white" : "text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  الإعدادات
                </button>
                <Link href="/dashboard/history" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800">
                  <History className="w-5 h-5" />
                  السجل
                </Link>
                <Link href="/dashboard/watchlist" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-400 hover:bg-gray-800">
                  <List className="w-5 h-5" />
                  قائمتي
                </Link>
              </nav>
            </aside>

            <div className="flex-1">
              {activeTab === "profile" && (
                <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
                  <h1 className="text-3xl font-bold mb-6">الملف الشخصي</h1>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">الاسم</label>
                      <Input value={session.user?.name || ""} disabled className="bg-gray-800 border-gray-700 text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">البريد الإلكتروني</label>
                      <Input value={session.user?.email || ""} disabled className="bg-gray-800 border-gray-700 text-white" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "settings" && (
                <div className="bg-gray-900 rounded-lg p-8 border border-gray-800">
                  <h1 className="text-3xl font-bold mb-6">الإعدادات</h1>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">اللغة المفضلة</label>
                      <select className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white">
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">الجودة المفضلة</label>
                      <select className="w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white">
                        <option value="auto">تلقائي</option>
                        <option value="1080p">1080p</option>
                        <option value="720p">720p</option>
                        <option value="480p">480p</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="autoplay" className="w-4 h-4 rounded border-gray-700 bg-gray-800 text-red-600" defaultChecked />
                      <label htmlFor="autoplay" className="text-sm">تشغيل تلقائي</label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}