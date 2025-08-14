"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingBag, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useCart } from "@/contexts/cart-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

// Mock wishlist data
const mockWishlistItems = [
  {
    id: 1,
    name: "Classic White Button-Down Shirt",
    price: 89.99,
    originalPrice: 120.0,
    brand: "FasHub",
    image: "https://innovecouture.vamtam.com/wp-content/uploads/2024/02/20230914_VB_104_5094d31e-9d7a-462c-b745-cf51840a78ef_1500x.jpg?height=600&width=500?height=300&width=250",
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Light Blue", "Cream"],
  },
  {
    id: 3,
    name: "Silk Midi Dress",
    price: 249.99,
    originalPrice: 320.0,
    brand: "FasHub",
    image: "https://m.media-amazon.com/images/I/61DwDPy8sFL._SX522_.jpg?height=600&width=500?height=300&width=250",
    inStock: true,
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Navy Floral", "Burgundy Floral", "Black Floral"],
  },
  {
    id: 7,
    name: "Leather Crossbody Bag",
    price: 199.99,
    originalPrice: 250.0,
    brand: "FasHub",
    image: "https://i.pinimg.com/736x/d9/c2/c2/d9c2c202fa99428fc1dfad5073abc4e1.jpg?height=300&width=250",
    inStock: false,
    sizes: ["One Size"],
    colors: ["Black", "Brown", "Tan", "Burgundy"],
  },
]

export default function WishlistPage() {
  const { isAuthenticated } = useAuth()
  const { addToCart } = useCart()
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems)

  const removeFromWishlist = (itemId) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== itemId))
  }

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      size: item.sizes[0],
      color: item.colors[0],
      quantity: 1,
    })
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Sign in to view your wishlist</h1>
            <p className="text-gray-600 mb-8">Save your favorite items and never lose track of what you love.</p>
            <Button className="bg-indigo-600 hover:bg-indigo-700">Sign In</Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-sans flex items-center gap-3">
            <Heart size={32} className="text-red-500" />
            My Wishlist
          </h1>
          <p className="text-gray-600 mt-2">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"} saved for later
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8">Start adding items you love to keep track of them.</p>
            <Link href="/search">
              <Button className="bg-indigo-600 hover:bg-indigo-700">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group">
                <div className="relative">
                  <Link href={`/products/${item.id}`}>
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                  >
                    <X size={16} className="text-gray-600" />
                  </button>
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="bg-white px-3 py-1 rounded-full text-sm font-medium text-gray-900">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <div className="mb-2">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600">{item.brand}</p>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="font-bold text-gray-900">${item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={() => handleAddToCart(item)}
                      disabled={!item.inStock}
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={16} />
                      {item.inStock ? "Add to Cart" : "Out of Stock"}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
