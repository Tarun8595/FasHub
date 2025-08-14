"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ShoppingBag, Check } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

export default function ProductQuickAdd({ product, children }) {
  const { addItem } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return

    addItem(product, quantity, selectedSize, selectedColor)
    setIsAdded(true)

    // Reset form and close modal after a short delay
    setTimeout(() => {
      setIsAdded(false)
      setIsOpen(false)
      setSelectedSize("")
      setSelectedColor("")
      setQuantity(1)
    }, 1500)
  }

  const getColorClass = (color) => {
    const colorMap = {
      white: "bg-white border-2 border-gray-300",
      black: "bg-black",
      gray: "bg-gray-400",
      blue: "bg-blue-600",
      navy: "bg-blue-900",
      pink: "bg-pink-400",
      brown: "bg-amber-800",
      tan: "bg-amber-200",
      floral: "bg-gradient-to-r from-pink-400 to-purple-400",
    }
    return colorMap[color] || "bg-gray-300"
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-sans">{product.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Product Image and Price */}
          <div className="flex items-center space-x-4">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div>
              <p className="text-2xl font-bold text-gray-900">${product.price}</p>
              {product.originalPrice && <p className="text-sm text-gray-500 line-through">${product.originalPrice}</p>}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Size</label>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Color</label>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${
                    selectedColor === color ? "border-indigo-600 ring-2 ring-indigo-200" : "border-gray-300"
                  } ${getColorClass(color)}`}
                  title={color}
                />
              ))}
            </div>
            {selectedColor && <p className="mt-2 text-sm text-gray-600 capitalize">Selected: {selectedColor}</p>}
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Quantity</label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={!selectedSize || !selectedColor || isAdded}
            className={`w-full py-3 transition-all ${
              isAdded ? "bg-green-600 hover:bg-green-600" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isAdded ? (
              <>
                <Check size={20} className="mr-2" />
                Added to Cart!
              </>
            ) : (
              <>
                <ShoppingBag size={20} className="mr-2" />
                Add to Cart
              </>
            )}
          </Button>

          {(!selectedSize || !selectedColor) && (
            <p className="text-sm text-red-600 text-center">
              Please select {!selectedSize && "size"} {!selectedSize && !selectedColor && "and"}{" "}
              {!selectedColor && "color"}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
