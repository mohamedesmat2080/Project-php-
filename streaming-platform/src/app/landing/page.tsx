import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Film, Tv, Settings, Users, Zap, Globe, Shield, Star } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-red-600">
            ستريم إكس
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/demo">
              <Button variant="ghost" className="text-white">تجربة مباشرة</Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-red-600 hover:bg-red-700">اشترِ الآن</Button>
            </Link>
          </nav>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            منصة بث احترافية جاهزة للبيع
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            اسكريبت متكامل لإدارة وبيع اشتراكات أفلام ومسلسلات. لوحة تحكم متقدمة، نظام embeds، استيراد بيانات، وتخصيص كامل.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/demo">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8">
                شاهد العرض التجريبي
              </Button>
            </Link>
            <Link href="#features">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8">
                اكتشف الميزات
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">ماذا تحصل عند الشراء؟</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">لوحة تحكم متقدمة</h3>
              <p className="text-gray-400">إدارة كاملة للمحتوى، الفئات، الاشتراكات، والإعدادات من مكان واحد</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">نظام Embeds</h3>
              <p className="text-gray-400">دعم كامل لـ iframe embeds من أي مصدر بث. أضف كود الembed وشغل على الفور</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Film className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">استيراد تلقائي</h3>
              <p className="text-gray-400">استورد مئات الأفلام والمسلسلات بضغطة زر باستخدام JSON</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">نظام اشتراكات</h3>
              <p className="text-gray-400">خطط أسعار متعددة، تجديد تلقائي، إلغاء، وإدارة مدفوعات</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">تخصيص كامل</h3>
              <p className="text-gray-400">غير اسم الموقع، الشعار، الألوان، والSEO من الإعدادات</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">لوحة تحكم أدمن</h3>
              <p className="text-gray-400">إحصائيات، إدارة مستخدمين، مراقبة المشاهدات، وتحليلات</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">مقارنة مع البدائل</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-2">احترافي</h3>
              <p className="text-4xl font-bold mb-4">$99<span className="text-lg text-gray-400">/مرة واحدة</span></p>
              <ul className="space-y-2 mb-8 text-gray-300">
                <li>✓ كود المصدر الكامل</li>
                <li>✓ لوحة تحكم متقدمة</li>
                <li>✓ نظام embeds</li>
                <li>✓ استيراد JSON</li>
                <li>✓ تحديثات مجانية</li>
                <li>✓ دعم فني</li>
              </ul>
              <Button className="w-full bg-red-600 hover:bg-red-700">اشترِ الآن</Button>
            </div>
            <div className="bg-gray-800 rounded-lg p-8 border-2 border-red-600 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 px-4 py-1 rounded-full text-sm font-semibold">
                الأكثر طلباً
              </div>
              <h3 className="text-2xl font-bold mb-2">تجاري</h3>
              <p className="text-4xl font-bold mb-4">$199<span className="text-lg text-gray-400">/مرة واحدة</span></p>
              <ul className="space-y-2 mb-8 text-gray-300">
                <li>✓ كل ميزات الاحترافي</li>
                <li>✓ ترخيص white-label</li>
                <li>✓ دعم تثبيت مجاني</li>
                <li>✓ customizations</li>
                <li>✓ دعم VIP</li>
                <li>✓ تحديثات لمدة سنة</li>
              </ul>
              <Button className="w-full bg-red-600 hover:bg-red-700">اشترِ الآن</Button>
            </div>
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-2">مؤسسي</h3>
              <p className="text-4xl font-bold mb-4">$499<span className="text-lg text-gray-400">/مرة واحدة</span></p>
              <ul className="space-y-2 mb-8 text-gray-300">
                <li>✓ كل ميزات التجاري</li>
                <li>✓ كود مصدر غير مشفر</li>
                <li>✓ تطوير مخصص</li>
                <li>✓ استضافة مجانية سنة</li>
                <li>✓ دعم 24/7</li>
                <li>✓ صيانة مستمرة</li>
              </ul>
              <Button className="w-full bg-red-600 hover:bg-red-700">تواصل معنا</Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black py-12 px-4 border-t border-white/10">
        <div className="container mx-auto text-center text-gray-400">
          <p>© 2024 ستريم إكس. جميع الحقوق محفوظة.</p>
          <p className="mt-2 text-sm">منصة احترافية لإدارة وبيع اشتراكات البث. متاحة للشراء على منصات مختلفة.</p>
        </div>
      </footer>
    </div>
  )
}