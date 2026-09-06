import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Play, History, List, User } from "lucide-react"

export default async function Dashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold text-red-600">
            StreamX
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-white">Home</Button>
            </Link>
            <Link href="/dashboard/watchlist">
              <Button variant="ghost" className="text-white">My List</Button>
            </Link>
            <Link href="/dashboard/history">
              <Button variant="ghost" className="text-white">History</Button>
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
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Continue Watching</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="group cursor-pointer">
                  <div className="aspect-video bg-gray-800 rounded-lg mb-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <h3 className="font-medium truncate">Movie {item}</h3>
                  <p className="text-sm text-gray-400">45 min left</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Popular on StreamX</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
                <div key={item} className="group cursor-pointer">
                  <div className="aspect-video bg-gray-800 rounded-lg mb-2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                  <h3 className="font-medium truncate">Movie {item}</h3>
                  <p className="text-sm text-gray-400">2024</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}