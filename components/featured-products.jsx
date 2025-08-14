"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Star } from "lucide-react"
import ProductQuickAdd from "@/components/product-quick-add"

const featuredProducts = [
  {
    id: 1,
    name: "Essential Cotton Tee",
    price: 29.99,
    originalPrice: 39.99,
    image: "https://i.pinimg.com/1200x/49/83/36/498336d3845fffd6a16de7d3369f429f.jpg?height=400&width=300",
    category: "Basics",
    rating: 4.8,
    reviews: 124,
    colors: ["white", "black", "gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
    isNew: false,
    isSale: true,
  },
  {
    id: 2,
    name: "Denim Jacket Classic",
    price: 89.99,
    image: "https://i.pinimg.com/736x/7d/c8/c3/7dc8c3b9c3f16b0a6eb88289455e57ac.jpg?height=400&width=300",
    category: "Outerwear",
    rating: 4.9,
    reviews: 89,
    colors: ["blue", "black", "white"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isSale: false,
  },
  {
    id: 3,
    name: "Floral Summer Dress",
    price: 79.99,
    image: "https://i.pinimg.com/1200x/ed/43/a8/ed43a8b14d417ed7161a59de1500f0f5.jpg?height=400&width=300",
    category: "Dresses",
    rating: 4.7,
    reviews: 156,
    colors: ["floral", "navy", "pink"],
    sizes: ["XS", "S", "M", "L"],
    isNew: true,
    isSale: false,
  },
  {
    id: 4,
    name: "Leather Ankle Boots",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://i.pinimg.com/736x/dc/d7/46/dcd7464d2664d154bce5aec210d36cd8.jpg?height=400&width=300",
    category: "Shoes",
    rating: 4.6,
    reviews: 78,
    colors: ["black", "brown", "tan"],
    sizes: ["6", "7", "8", "9", "10"],
    isNew: false,
    isSale: true,
  },
]

export default function FeaturedProducts() {
  const [wishlist, setWishlist] = useState(new Set())

  const toggleWishlist = (productId) => {
    const newWishlist = new Set(wishlist)
    if (newWishlist.has(productId)) {
      newWishlist.delete(productId)
    } else {
      newWishlist.add(productId)
    }
    setWishlist(newWishlist)
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-sans">Featured Products</h2>
          <p className="mt-4 text-lg text-gray-600">Discover our most popular items, handpicked just for you</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 border-0 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group cursor-pointer hover:shadow-lg border-0 transition-shadow duration-300"
            >
              <div className="relative overflow-hidden border-0 rounded-t-lg">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {product.isNew && <Badge className="bg-indigo-600 text-white">New</Badge>}
                  {product.isSale && <Badge className="bg-red-500 text-white">Sale</Badge>}
                </div>

                {/* Wishlist button */}
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                  <Heart
                    size={20}
                    className={wishlist.has(product.id) ? "text-red-500 fill-current" : "text-gray-400"}
                  />
                </button>

                {/* Quick add to cart */}
                <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ProductQuickAdd product={product}>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">Quick Add</Button>
                  </ProductQuickAdd>
                </div>
              </div>

              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500 uppercase tracking-wide">{product.category}</span>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2 font-sans">{product.name}</h3>

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                </div>

                {/* Color options */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-sm text-gray-600">Colors:</span>
                  <div className="flex space-x-1">
                    {product.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className={`w-4 h-4 rounded-full border border-gray-300 ${
                          color === "white"
                            ? "bg-white"
                            : color === "black"
                              ? "bg-black"
                              : color === "gray"
                                ? "bg-gray-400"
                                : color === "blue"
                                  ? "bg-blue-600"
                                  : color === "navy"
                                    ? "bg-blue-900"
                                    : color === "pink"
                                      ? "bg-pink-400"
                                      : color === "brown"
                                        ? "bg-amber-800"
                                        : color === "tan"
                                          ? "bg-amber-200"
                                          : "bg-gradient-to-r from-pink-400 to-purple-400"
                        }`}
                      />
                    ))}
                    {product.colors.length > 3 && (
                      <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
                    )}
                  </div>
                </div>

                {/* Size options */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">Sizes:</span>
                  <span className="text-sm text-gray-900">{product.sizes.join(", ")}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="px-8 py-3 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  )
}
