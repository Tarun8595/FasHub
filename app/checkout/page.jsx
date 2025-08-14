"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ArrowRight, CreditCard, Truck, Shield, Check } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import { useRouter } from "next/navigation"

const steps = [
  { id: 1, name: "Shipping", icon: Truck },
  { id: 2, name: "Payment", icon: CreditCard },
  { id: 3, name: "Review", icon: Shield },
]

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCart()
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)

  // Shipping form state
  const [shippingData, setShippingData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    apartment: "",
    city: user?.city || "",
    state: "",
    zipCode: user?.zipCode || "",
    country: user?.country || "United States",
  })

  // Payment form state
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
    billingAddress: "same",
  })

  const [shippingMethod, setShippingMethod] = useState("standard")
  const [saveInfo, setSaveInfo] = useState(false)

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items, router])

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const subtotal = getCartTotal()
  const shippingCost = shippingMethod === "express" ? 15.99 : shippingMethod === "overnight" ? 25.99 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shippingCost + tax

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePlaceOrder = async () => {
    setIsProcessing(true)

    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Create order object
    const order = {
      id: `ORD-${Date.now()}`,
      items,
      shipping: shippingData,
      payment: { ...paymentData, cardNumber: "**** **** **** " + paymentData.cardNumber.slice(-4) },
      shippingMethod,
      subtotal,
      shipping: shippingCost,
      tax,
      total,
      status: "confirmed",
      date: new Date().toISOString(),
    }

    // Clear cart and redirect to confirmation
    clearCart()
    router.push(`/order-confirmation?orderId=${order.id}`)
  }

  if (items.length === 0) {
    return null // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Cart
          </Link>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? "bg-indigo-600 border-indigo-600 text-white"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  <step.icon size={20} />
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${currentStep >= step.id ? "text-indigo-600" : "text-gray-400"}`}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${currentStep > step.id ? "bg-indigo-600" : "bg-gray-300"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Main Content */}
          <div className="lg:col-span-7">
            {/* Step 1: Shipping */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={shippingData.firstName}
                        onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={shippingData.lastName}
                        onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingData.email}
                      onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={shippingData.phone}
                      onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={shippingData.address}
                      onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                      placeholder="Street address"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apartment">Apartment, suite, etc. (optional)</Label>
                    <Input
                      id="apartment"
                      value={shippingData.apartment}
                      onChange={(e) => setShippingData({ ...shippingData, apartment: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={shippingData.city}
                        onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select
                        value={shippingData.state}
                        onValueChange={(value) => setShippingData({ ...shippingData, state: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                          <SelectItem value="IL">Illinois</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={shippingData.zipCode}
                        onChange={(e) => setShippingData({ ...shippingData, zipCode: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label>Shipping Method</Label>
                    <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="standard" id="standard" />
                          <Label htmlFor="standard">Standard Shipping (5-7 business days)</Label>
                        </div>
                        <span className="font-medium">$9.99</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="express" id="express" />
                          <Label htmlFor="express">Express Shipping (2-3 business days)</Label>
                        </div>
                        <span className="font-medium">$15.99</span>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="overnight" id="overnight" />
                          <Label htmlFor="overnight">Overnight Shipping (1 business day)</Label>
                        </div>
                        <span className="font-medium">$25.99</span>
                      </div>
                    </RadioGroup>
                  </div>

                  {isAuthenticated && (
                    <div className="flex items-center space-x-2">
                      <Checkbox id="saveInfo" checked={saveInfo} onCheckedChange={setSaveInfo} />
                      <Label htmlFor="saveInfo">Save this information for next time</Label>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">Payment Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData({ ...paymentData, cardNumber: e.target.value })}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        value={paymentData.expiryDate}
                        onChange={(e) => setPaymentData({ ...paymentData, expiryDate: e.target.value })}
                        placeholder="MM/YY"
                        maxLength={5}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={paymentData.cvv}
                        onChange={(e) => setPaymentData({ ...paymentData, cvv: e.target.value })}
                        placeholder="123"
                        maxLength={4}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input
                      id="nameOnCard"
                      value={paymentData.nameOnCard}
                      onChange={(e) => setPaymentData({ ...paymentData, nameOnCard: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <Label>Billing Address</Label>
                    <RadioGroup
                      value={paymentData.billingAddress}
                      onValueChange={(value) => setPaymentData({ ...paymentData, billingAddress: value })}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="same" id="same" />
                        <Label htmlFor="same">Same as shipping address</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="different" id="different" />
                        <Label htmlFor="different">Use a different billing address</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <Shield className="text-blue-600 mr-2" size={20} />
                      <span className="text-sm text-blue-800">Your payment information is encrypted and secure</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans">Review Your Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Shipping Info */}
                  <div>
                    <h3 className="font-semibold mb-2">Shipping Address</h3>
                    <div className="text-sm text-gray-600">
                      <p>
                        {shippingData.firstName} {shippingData.lastName}
                      </p>
                      <p>{shippingData.address}</p>
                      {shippingData.apartment && <p>{shippingData.apartment}</p>}
                      <p>
                        {shippingData.city}, {shippingData.state} {shippingData.zipCode}
                      </p>
                      <p>{shippingData.country}</p>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div>
                    <h3 className="font-semibold mb-2">Payment Method</h3>
                    <div className="text-sm text-gray-600">
                      <p>**** **** **** {paymentData.cardNumber.slice(-4)}</p>
                      <p>{paymentData.nameOnCard}</p>
                    </div>
                  </div>

                  {/* Shipping Method */}
                  <div>
                    <h3 className="font-semibold mb-2">Shipping Method</h3>
                    <div className="text-sm text-gray-600">
                      <p>
                        {shippingMethod === "standard" && "Standard Shipping (5-7 business days)"}
                        {shippingMethod === "express" && "Express Shipping (2-3 business days)"}
                        {shippingMethod === "overnight" && "Overnight Shipping (1 business day)"}
                      </p>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div>
                    <h3 className="font-semibold mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {items.map((item) => (
                        <div key={item.cartId} className="flex items-center space-x-4">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-md"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-gray-600">
                              Size: {item.size} • Color: {item.color} • Qty: {item.quantity}
                            </p>
                          </div>
                          <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button
                onClick={handlePrevStep}
                variant="outline"
                disabled={currentStep === 1}
                className="flex items-center bg-transparent"
              >
                <ArrowLeft size={16} className="mr-2" />
                Previous
              </Button>

              {currentStep < 3 ? (
                <Button onClick={handleNextStep} className="bg-indigo-600 hover:bg-indigo-700 flex items-center">
                  Next
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="bg-indigo-600 hover:bg-indigo-700 flex items-center"
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                  {!isProcessing && <Check size={16} className="ml-2" />}
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="mt-16 lg:mt-0 lg:col-span-5">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="font-sans">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.cartId} className="flex justify-between text-sm">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>

                <hr className="border-gray-200" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>

                <hr className="border-gray-200" />

                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-4">
                  <div className="flex items-center">
                    <Shield className="text-green-600 mr-2" size={16} />
                    <span className="text-sm text-green-800">30-day return policy • Free returns</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
