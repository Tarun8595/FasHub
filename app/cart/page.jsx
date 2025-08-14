"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Minus, X, ArrowLeft, ShoppingBag } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal, clearCart } = useCart()

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const shipping = items.length > 0 ? (getCartTotal() > 75 ? 0 : 9.99) : 0
  const tax = getCartTotal() * 0.08
  const total = getCartTotal() + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors">
            <ArrowLeft size={20} className="mr-2" />
            Continue Shopping
          </Link>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-8 font-sans">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/">
              <Button className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
            {/* Cart Items */}
            <div className="lg:col-span-7">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {items.map((item, index) => (
                      <div key={item.cartId}>
                        {index > 0 && <hr className="border-gray-200" />}

                        <div className="flex items-center space-x-4 py-4">
                          <div className="flex-shrink-0">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-24 h-24 object-cover rounded-md"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                            <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                              <span>Size: {item.size}</span>
                              <span>Color: {item.color}</span>
                            </div>
                            <p className="mt-2 text-lg font-medium text-gray-900">{formatPrice(item.price)}</p>
                          </div>

                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} className={item.quantity <= 1 ? "text-gray-300" : "text-gray-600"} />
                            </button>

                            <span className="w-12 text-center text-lg font-medium">{item.quantity}</span>

                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                            >
                              <Plus size={16} className="text-gray-600" />
                            </button>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-medium text-gray-900">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                            <button
                              onClick={() => removeItem(item.cartId)}
                              className="mt-2 text-red-600 hover:text-red-700 transition-colors"
                            >
                              <X size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 bg-transparent"
                    >
                      Clear Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="mt-16 lg:mt-0 lg:col-span-5">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 mb-4 font-sans">Order Summary</h2>

                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{formatPrice(getCartTotal())}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium">{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">{formatPrice(tax)}</span>
                    </div>

                    <hr className="border-gray-200" />

                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  {getCartTotal() < 75 && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-md">
                      <p className="text-sm text-blue-800">
                        Add {formatPrice(75 - getCartTotal())} more for free shipping!
                      </p>
                    </div>
                  )}

                  <div className="mt-6 space-y-3">
                    <Link href="/checkout">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-700 py-3">Proceed to Checkout</Button>
                    </Link>

                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">or</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Input type="text" placeholder="Enter promo code" className="border-gray-300" />
                      <Button
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                      >
                        Apply Code
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
