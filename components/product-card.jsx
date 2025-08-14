"use client"

import { useState } from "react"
import { Heart, Star, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import ProductQuickAdd from "@/components/product-quick-add"
import Link from "next/link"

export default function ProductCard({ product, viewMode = "grid" }) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const { addToCart } = useCart()

  const handleQuickAdd = () => {
    if (product.sizes.length > 1 || product.colors.length > 1) {
      setShowQuickAdd(true)
    } else {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: product.sizes[0],
        color: product.colors[0],
        quantity: 1,
      })
    }
  }

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex gap-6">
        <div className="w-48 h-48 flex-shrink-0">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-2">
            <div>
              <Link href={`/products/${product.id}`}>
                <h3 className="text-lg font-semibold text-gray-900 hover:text-indigo-600 transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
            </div>
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-2 rounded-full transition-colors ${
                isWishlisted ? "text-red-500 bg-red-50" : "text-gray-400 hover:text-red-500"
              }`}
            >
              <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
          </div>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
            <Button onClick={handleQuickAdd} className="flex items-center gap-2">
              <ShoppingBag size={16} />
              Add to Cart
            </Button>
          </div>
        </div>

        {showQuickAdd && (
          <ProductQuickAdd product={product} isOpen={showQuickAdd} onClose={() => setShowQuickAdd(false)} />
        )}
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow">
      <div className="relative">
        <Link href={`/products/${product.id}`}>
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isWishlisted ? "text-red-500 bg-white" : "text-gray-400 bg-white hover:text-red-500"
          }`}
        >
          <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
        </button>
        {product.originalPrice && <Badge className="absolute top-3 left-3 bg-red-500">Sale</Badge>}
      </div>

      <div className="p-4">
        <div className="mb-2">
          <Link href={`/products/${product.id}`}>
            <h3 className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors">{product.name}</h3>
          </Link>
          <p className="text-sm text-gray-600">{product.brand}</p>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">${product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>
        </div>

        <Button onClick={handleQuickAdd} className="w-full flex items-center justify-center gap-2">
          <ShoppingBag size={16} />
          Add to Cart
        </Button>
      </div>

      {showQuickAdd && (
        <ProductQuickAdd product={product} isOpen={showQuickAdd} onClose={() => setShowQuickAdd(false)} />
      )}
    </div>
  )
}
