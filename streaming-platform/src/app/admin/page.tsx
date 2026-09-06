import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"

export default function AdminPage() {
  return redirect("/admin/advanced")
}