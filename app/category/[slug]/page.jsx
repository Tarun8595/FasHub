"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { products, categories } from "@/data/products"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Grid, List } from "lucide-react"

const categoryBanners = {
  men: "https://wdtkushi.wpengine.com/wp-content/uploads/2024/07/Home-04-Slider-02.png?auto=format&fit=crop&w=1200&q=80",
  women: "https://wdtkushi.wpengine.com/wp-content/uploads/2024/07/home-05-slider-01.jpg?auto=format&fit=crop&w=1200&q=80",
  kids: "https://woopy.ancorathemes.com/wp-content/uploads/2022/06/image-2-890x664.jpg?auto=format&fit=crop&w=1200&q=80",
  sale: "https://wdtkushi.wpengine.com/wp-content/uploads/2024/08/location3.jpg?height=300&width=1200",
  // Add more categories and URLs as needed
}

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params.slug

  const [filteredProducts, setFilteredProducts] = useState([])
  const [viewMode, setViewMode] = useState("grid")
  const [sortBy, setSortBy] = useState("featured")

  const category = categories.find((c) => c.id === categorySlug)

  useEffect(() => {
    let filtered = products

    if (categorySlug === "sale") {
      filtered = products.filter((p) => p.originalPrice)
    } else {
      filtered = products.filter((p) => p.category === categorySlug)
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        break
    }

    setFilteredProducts(filtered)
  }, [categorySlug, sortBy])

  if (!category && categorySlug !== "sale") {
    return <div className="min-h-screen flex items-center justify-center">Category not found</div>
  }

  const categoryName = categorySlug === "sale" ? "Sale" : category?.name || ""

return (
  <div className="min-h-screen bg-gray-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 capitalize">{categoryName}</h1>
        <p className="text-gray-600 max-w-2xl">
          {categorySlug === "sale"
            ? "Discover amazing deals on our best-selling items. Limited time offers on premium clothing and accessories."
            : `Explore our curated collection of ${categoryName.toLowerCase()} clothing and accessories. Find your perfect style with our premium selection.`}
        </p>
      </div>

      {/* Category Banner */}
      <div className="mb-8 rounded-lg overflow-hidden">
        <img
          src={categoryBanners[categorySlug] || "https://innovecouture.vamtam.com/wp-content/uploads/2024/01/GettyImages-1698761540.jpg?height=300&width=1200"}
          alt={`${categoryName} Collection`}
          className="w-full h-64 object-cover"
        />
      </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">{filteredProducts.length} products</p>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid size={16} />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div
            className={`grid gap-6 ${
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
            }`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
