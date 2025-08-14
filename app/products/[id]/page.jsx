"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { products } from "@/data/products"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, ShoppingBag, Truck, Shield, RotateCcw } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export default function ProductPage() {
  const params = useParams()
  const product = products.find((p) => p.id === Number.parseInt(params.id))

  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const { addToCart } = useCart()

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center">Product not found</div>
  }

  const handleAddToCart = () => {
    if (product.sizes.length > 1 && !selectedSize) {
      alert("Please select a size")
      return
    }
    if (product.colors.length > 1 && !selectedColor) {
      alert("Please select a color")
      return
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize || product.sizes[0],
      color: selectedColor || product.colors[0],
      quantity: quantity,
    })
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? "border-indigo-600" : "border-gray-200"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-2 rounded-full transition-colors ${
                    isWishlisted ? "text-red-500 bg-red-50" : "text-gray-400 hover:text-red-500"
                  }`}
                >
                  <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>
              <p className="text-lg text-gray-600 mb-4">{product.brand}</p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
                      <Badge className="bg-red-500">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </Badge>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>
            </div>

            <div>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <div className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            {product.sizes.length > 1 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Size</h3>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2 px-4 border rounded-md text-center transition-colors ${
                        selectedSize === size
                          ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors.length > 1 && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Color</h3>
                <div className="flex gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`py-2 px-4 border rounded-md transition-colors ${
                        selectedColor === color
                          ? "border-indigo-600 bg-indigo-50 text-indigo-600"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 hover:bg-gray-50">
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-50">
                    +
                  </button>
                </div>
                <span className="text-gray-600">{product.inStock ? "In Stock" : "Out of Stock"}</span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="w-full flex items-center justify-center gap-2 py-3"
              >
                <ShoppingBag size={20} />
                Add to Cart
              </Button>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Truck className="text-indigo-600" size={24} />
                  <span className="text-sm text-gray-600">Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <RotateCcw className="text-indigo-600" size={24} />
                  <span className="text-sm text-gray-600">30-Day Returns</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Shield className="text-indigo-600" size={24} />
                  <span className="text-sm text-gray-600">Secure Payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
