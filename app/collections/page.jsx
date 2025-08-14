"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { products } from "@/data/products"

export default function CollectionsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Items", count: products.length },
    { id: "women", name: "Women", count: products.filter((p) => p.category === "women").length },
    { id: "men", name: "Men", count: products.filter((p) => p.category === "men").length },
    { id: "accessories", name: "Accessories", count: products.filter((p) => p.category === "accessories").length },
  ]

  const filteredProducts =
    selectedCategory === "all" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">New Collection 2024</h1>
          <p className="text-xl mb-8 opacity-90">
            Discover our latest curated pieces designed for the modern lifestyle
          </p>
          <div className="flex justify-center space-x-4">
            <Button variant="outline" className="bg-white text-indigo-600 hover:bg-gray-100">
              Free Shipping on Orders $100+
            </Button>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="transition-all duration-200 hover:scale-105"
            >
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="animate-fade-in">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-12">
          <Button size="lg" className="px-8">
            Load More Products
          </Button>
          <p className="text-gray-500 mt-4">
            Showing {filteredProducts.length} of {filteredProducts.length} products
          </p>
        </div>
      </div>

      <Footer />
    </div>
  )
}
