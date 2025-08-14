import Header from "@/components/header"
import Hero from "@/components/hero"
import FeaturedProducts from "@/components/featured-products"
import CategoryGrid from "@/components/category-grid"
import Newsletter from "@/components/newsletter"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <FeaturedProducts />
      <CategoryGrid />
      <Newsletter />
      <Footer />
    </div>
  )
}
