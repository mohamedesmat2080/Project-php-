import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Film, Users, DollarSign, TrendingUp } from "lucide-react"

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user?.role !== "ADMIN") {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/admin" className="text-2xl font-bold text-red-600">
            StreamX Admin
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="text-white">Back to App</Button>
            </Link>
            <span className="text-sm text-gray-400">{session.user?.name}</span>
          </div>
        </div>
      </header>

      <main className="pt-24 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400">Total Users</h3>
                <Users className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-3xl font-bold">1,234</p>
              <p className="text-sm text-green-500 mt-2">+12% from last month</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400">Total Revenue</h3>
                <DollarSign className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-3xl font-bold">$45,678</p>
              <p className="text-sm text-green-500 mt-2">+8% from last month</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400">Active Subscriptions</h3>
                <TrendingUp className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-3xl font-bold">892</p>
              <p className="text-sm text-green-500 mt-2">+5% from last month</p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-400">Total Videos</h3>
                <Film className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-3xl font-bold">156</p>
              <p className="text-sm text-gray-400 mt-2">Across all categories</p>
            </div>
          </div>

          <section className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Content Management</h2>
              <Link href="/admin/content/new">
                <Button className="bg-red-600 hover:bg-red-700">Add New Content</Button>
              </Link>
            </div>
            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-400">Title</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-400">Type</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-400">Views</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-400">Status</th>
                    <th className="text-left px-6 py-3 text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  <tr>
                    <td className="px-6 py-4">Sample Movie 1</td>
                    <td className="px-6 py-4">Movie</td>
                    <td className="px-6 py-4">1,234</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-900/50 text-green-300 rounded text-xs">Published</span>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm" className="text-red-600">Edit</Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">Sample Series 1</td>
                    <td className="px-6 py-4">Series</td>
                    <td className="px-6 py-4">2,345</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-900/50 text-green-300 rounded text-xs">Published</span>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm" className="text-red-600">Edit</Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}