"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Heart, Share2, ShoppingBag } from "lucide-react"

const lookbookData = [
  {
    id: 1,
    title: "Urban Chic",
    description: "Perfect for city adventures and coffee dates",
    image: "https://i.pinimg.com/1200x/4f/d1/5a/4fd15ac0118aa5a233a41ce51066f7a9.jpg?height=600&width=400",
    products: [
      { name: "Oversized Blazer", price: "$89", id: 1 },
      { name: "High-Waist Jeans", price: "$65", id: 2 },
      { name: "White Sneakers", price: "$120", id: 3 },
    ],
    tags: ["Casual", "Street Style", "Comfortable"],
  },
  {
    id: 2,
    title: "Office Elegance",
    description: "Professional yet stylish for the modern workplace",
    image: "https://i.pinimg.com/1200x/f5/e6/69/f5e66939667f09a0dfa0dfa2d492d72d.jpg?height=600&width=400",
    products: [
      { name: "Silk Blouse", price: "$95", id: 4 },
      { name: "Tailored Trousers", price: "$110", id: 5 },
      { name: "Leather Pumps", price: "$150", id: 6 },
    ],
    tags: ["Professional", "Elegant", "Sophisticated"],
  },
  {
    id: 3,
    title: "Weekend Vibes",
    description: "Relaxed and comfortable for leisure time",
    image: "https://i.pinimg.com/1200x/97/3a/5d/973a5d9c1b27a7367db649de88f25dc4.jpg?height=600&width=400",
    products: [
      { name: "Cozy Sweater", price: "$75", id: 7 },
      { name: "Denim Skirt", price: "$55", id: 8 },
      { name: "Canvas Sneakers", price: "$85", id: 1 },
    ],
    tags: ["Casual", "Comfortable", "Relaxed"],
  },
  {
    id: 4,
    title: "Date Night",
    description: "Romantic and sophisticated for special evenings",
    image: "https://i.pinimg.com/736x/97/9a/d1/979ad1560d125e2b0af89951a44d03a5.jpg?height=600&width=400",
    products: [
      { name: "Little Black Dress", price: "$125", id: 2 },
      { name: "Statement Earrings", price: "$45", id: 3 },
      { name: "Heeled Sandals", price: "$95", id: 4 },
    ],
    tags: ["Romantic", "Elegant", "Evening"],
  },
]

export default function LookbookPage() {
  const [selectedLook, setSelectedLook] = useState(null)

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-pink-50 to-indigo-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 animate-fade-in">Style Lookbook</h1>
          <p className="text-xl text-gray-600 mb-8">
            Get inspired by our curated outfit combinations for every occasion
          </p>
        </div>
      </div>

      {/* Lookbook Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {lookbookData.map((look) => (
            <div key={look.id} className="group cursor-pointer animate-fade-in">
              <div className="relative overflow-hidden rounded-lg aspect-[3/4] mb-4">
                <img
                  src={look.image || "/placeholder.svg"}
                  alt={look.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-4">
                    <Button size="sm" variant="outline" className="bg-white">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="bg-white">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button size="sm" className="bg-indigo-600 text-white">
                      <ShoppingBag className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-gray-900">{look.title}</h3>
                <p className="text-gray-600">{look.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {look.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Products in this look */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Shop this look:</h4>
                  {look.products.map((product) => (
                    <div key={product.id} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{product.name}</span>
                      <span className="font-medium text-gray-900">{product.price}</span>
                    </div>
                  ))}
                </div>

                <Button className="w-full mt-4 bg-transparent" variant="outline">
                  Shop Complete Look - ${look.products.reduce((sum, p) => sum + Number.parseInt(p.price.slice(1)), 0)}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Create Your Own Style</h2>
          <p className="text-lg text-gray-600 mb-8">
            Mix and match our pieces to create looks that reflect your unique personality
          </p>
          <Button size="lg" className="px-8">
            Browse All Products
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  )
}
