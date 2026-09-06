import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Users, Film, CreditCard, ChevronLeft } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-red-600">
            ستريم إكس
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-white hover:text-white">
                تسجيل الدخول
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-red-600 hover:bg-red-700">
                ابدأ الآن
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            أفلام ومسلسلات بلا حدود
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            شاهد في أي مكان. ألغي في أي وقت. جاهز للمشاهدة؟ أدخل بريدك الإلكتروني لإنشاء أو استعادة عضويتك.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8">
                ابدأ تجربتك المجانية
              </Button>
            </Link>
            <Link href="#pricing">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8">
                عرض الخطط
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">لماذا تختار ستريم إكس؟</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Film className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">محتوى بلا حدود</h3>
              <p className="text-gray-400">آلاف الأفلام والمسلسلات لمشاهدتها في أي وقت</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">شاهد في كل مكان</h3>
              <p className="text-gray-400">بث على هاتفك، تابلت، لابتوك، وتلفزيون</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">خطط مرنة</h3>
              <p className="text-gray-400">اختر الخطة المناسبة لاحتياجاتك. ألغي في أي وقت.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">اختر خطتك</h2>
          <p className="text-gray-400 text-center mb-16">شاهد على تلفزيونك، لابتوك، هاتفك، وتابلت</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-2">أساسي</h3>
              <p className="text-4xl font-bold mb-4">$9.99<span className="text-lg text-gray-400">/شهر</span></p>
              <ul className="space-y-2 mb-8 text-gray-300">
                <li>دقة 720p</li>
                <li>شاشة واحدة في الوقت</li>
                <li>محتوى محدود</li>
              </ul>
              <Button className="w-full bg-white text-black hover:bg-gray-200">اختر أساسي</Button>
            </div>
            <div className="bg-gray-800 rounded-lg p-8 border-2 border-red-600 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 px-4 py-1 rounded-full text-sm font-semibold">
                الأكثر شعبية
              </div>
              <h3 className="text-2xl font-bold mb-2">قياسي</h3>
              <p className="text-4xl font-bold mb-4">$15.99<span className="text-lg text-gray-400">/شهر</span></p>
              <ul className="space-y-2 mb-8 text-gray-300">
                <li>دقة 1080p</li>
                <li>شاشتان في الوقت</li>
                <li>مكتبة محتوى كاملة</li>
              </ul>
              <Button className="w-full bg-red-600 hover:bg-red-700">اختر قياسي</Button>
            </div>
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-2">بريميوم</h3>
              <p className="text-4xl font-bold mb-4">$22.99<span className="text-lg text-gray-400">/شهر</span></p>
              <ul className="space-y-2 mb-8 text-gray-300">
                <li>4K + HDR</li>
                <li>4 شاشات في الوقت</li>
                <li>مكتبة كاملة + حصري</li>
              </ul>
              <Button className="w-full bg-white text-black hover:bg-gray-200">اختر بريميوم</Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black py-12 px-4 border-t border-white/10">
        <div className="container mx-auto text-center text-gray-400">
          <p>© 2024 ستريم إكس. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  )
}