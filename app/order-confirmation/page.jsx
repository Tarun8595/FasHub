"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Package, Truck, Mail, ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function OrderConfirmationPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")
  const [orderDetails] = useState({
    id: orderId || "ORD-123456789",
    status: "confirmed",
    estimatedDelivery: "3-5 business days",
    trackingNumber: "TRK" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    email: "customer@example.com",
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 font-sans">Order Confirmed!</h1>
          <p className="text-lg text-gray-600">Thank you for your purchase. Your order has been successfully placed.</p>
        </div>

        {/* Order Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="font-sans">Order Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number</span>
                <span className="font-medium">{orderDetails.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="font-medium text-green-600 capitalize">{orderDetails.status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery</span>
                <span className="font-medium">{orderDetails.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tracking Number</span>
                <span className="font-medium">{orderDetails.trackingNumber}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-sans">What's Next?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Confirmation Email</h4>
                  <p className="text-sm text-gray-600">We've sent a confirmation email to {orderDetails.email}</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Package className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Order Processing</h4>
                  <p className="text-sm text-gray-600">Your order is being prepared for shipment</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Truck className="w-5 h-5 text-indigo-600 mt-0.5" />
                <div>
                  <h4 className="font-medium">Shipping Updates</h4>
                  <p className="text-sm text-gray-600">You'll receive tracking information once shipped</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/orders">
            <Button className="bg-indigo-600 hover:bg-indigo-700 flex items-center">
              View Order Details
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-blue-900 mb-3">Need Help?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-800">Customer Support</h4>
              <p className="text-blue-700">Available 24/7 to help with your order</p>
              <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                Contact Support
              </a>
            </div>
            <div>
              <h4 className="font-medium text-blue-800">Track Your Order</h4>
              <p className="text-blue-700">Get real-time updates on your shipment</p>
              <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                Track Package
              </a>
            </div>
            <div>
              <h4 className="font-medium text-blue-800">Return Policy</h4>
              <p className="text-blue-700">30-day hassle-free returns</p>
              <a href="#" className="text-blue-600 hover:text-blue-700 underline">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
