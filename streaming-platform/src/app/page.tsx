import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Play, Users, Film, CreditCard } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-red-600">
            StreamX
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/auth/signin">
              <Button variant="ghost" className="text-white hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-red-600 hover:bg-red-700">
                Get Started
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            Unlimited Movies, TV Shows, and More
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Watch anywhere. Cancel anytime. Ready to watch? Enter your email to create or restart your membership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-lg px-8">
                Start Your Free Trial
              </Button>
            </Link>
            <Link href="#pricing">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8">
                View Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose StreamX?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Film className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Unlimited Content</h3>
              <p className="text-gray-400">Thousands of movies and TV shows to watch anytime</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Watch Everywhere</h3>
              <p className="text-gray-400">Stream on your phone, tablet, laptop, and TV</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Flexible Plans</h3>
              <p className="text-gray-400">Choose the plan that fits your needs. Cancel anytime.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 px-4 bg-gray-900">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Choose Your Plan</h2>
          <p className="text-gray-400 text-center mb-16">Watch on your TV, laptop, phone, and tablet</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <p className="text-4xl font-bold mb-4">$9.99<span className="text-lg text-gray-400">/month</span></p>
              <ul className="space-y-2 mb-8 text-gray-300">
                <li>720p Resolution</li>
                <li>1 Screen at a time</li>
                <li>Limited Content</li>
              </ul>
              <Button className="w-full bg-white text-black hover:bg-gray-200">Choose Basic</Button>
            </div>
            <div className="bg-gray-800 rounded-lg p-8 border-2 border-red-600 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 px-4 py-1 rounded-full text-sm font-semibold">
                POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2">Standard</h3>
              <p className="text-4xl font-bold mb-4">$15.99<span className="text-lg text-gray-400">/month</span></p>
              <ul className="space-y-2 mb-8 text-gray-300">
                <li>1080p Resolution</li>
                <li>2 Screens at a time</li>
                <li>Full Content Library</li>
              </ul>
              <Button className="w-full bg-red-600 hover:bg-red-700">Choose Standard</Button>
            </div>
            <div className="bg-gray-800 rounded-lg p-8 border border-gray-700">
              <h3 className="text-2xl font-bold mb-2">Premium</h3>
              <p className="text-4xl font-bold mb-4">$22.99<span className="text-lg text-gray-400">/month</span></p>
              <ul className="space-y-2 mb-8 text-gray-300">
                <li>4K + HDR Resolution</li>
                <li>4 Screens at a time</li>
                <li>Full Content Library + Exclusive</li>
              </ul>
              <Button className="w-full bg-white text-black hover:bg-gray-200">Choose Premium</Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black py-12 px-4 border-t border-white/10">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2024 StreamX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}