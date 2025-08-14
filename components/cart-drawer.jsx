"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingBag, Plus, Minus, X } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, getCartTotal, getCartCount, clearCart } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="p-2 text-gray-700 hover:text-indigo-600 transition-colors relative">
          <ShoppingBag size={24} />
          {getCartCount() > 0 && (
            <Badge className="absolute -top-1 -right-1 bg-indigo-600 text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
              {getCartCount()}
            </Badge>
          )}
        </button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="text-left font-sans">Shopping Cart ({getCartCount()} items)</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
              <ShoppingBag size={64} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some items to get started</p>
              <Button onClick={() => setIsOpen(false)} className="bg-indigo-600 hover:bg-indigo-700">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto py-6">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.cartId} className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                        <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500">
                          <span>Size: {item.size}</span>
                          <span>•</span>
                          <span>Color: {item.color}</span>
                        </div>
                        <p className="mt-1 text-sm font-medium text-gray-900">{formatPrice(item.price)}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={16} className={item.quantity <= 1 ? "text-gray-300" : "text-gray-600"} />
                        </button>

                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>

                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={16} className="text-gray-600" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.cartId)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cart Footer */}
              <div className="border-t border-gray-200 pt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium text-gray-900">Subtotal</span>
                  <span className="text-lg font-bold text-gray-900">{formatPrice(getCartTotal())}</span>
                </div>

                <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>

                <div className="space-y-3">
                  <Link href="/checkout" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3">
                      Proceed to Checkout
                    </Button>
                  </Link>

                  <Button
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
                  >
                    Continue Shopping
                  </Button>

                  {items.length > 0 && (
                    <Button
                      variant="ghost"
                      onClick={clearCart}
                      className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Clear Cart
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
