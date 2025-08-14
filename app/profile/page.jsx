"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Mail, Calendar, Shield, Package, MapPin, CreditCard } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"

// Mock order data
const mockOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "delivered",
    total: 249.97,
    items: [
      {
        name: "Classic White Button-Down Shirt",
        price: 89.99,
        quantity: 1,
        image: "https://innovecouture.vamtam.com/wp-content/uploads/2024/02/20230914_VB_104_5094d31e-9d7a-462c-b745-cf51840a78ef_1500x.jpg?height=80&width=80",
      },
      { name: "High-Waisted Denim Jeans", price: 129.99, quantity: 1, image: "https://m.media-amazon.com/images/I/81wfcBsdKqL._SX425_.jpg?height=80&width=80" },
      { name: "Leather Crossbody Bag", price: 29.99, quantity: 1, image: "https://m.media-amazon.com/images/I/81f4M0zkc0L._SY395_.jpg?height=80&width=80" },
    ],
    shipping: {
      address: "123 Main St, New York, NY 10001",
      method: "Standard Shipping",
      tracking: "1Z999AA1234567890",
    },
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-20",
    status: "shipped",
    total: 159.99,
    items: [{ name: "Wool Blend Sweater", price: 159.99, quantity: 1, image: "https://m.media-amazon.com/images/I/71G7tDNyP+L._SY445_.jpg?height=80&width=80" }],
    shipping: {
      address: "123 Main St, New York, NY 10001",
      method: "Express Shipping",
      tracking: "1Z999AA1234567891",
    },
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-25",
    status: "processing",
    total: 89.99,
    items: [
      { name: "Premium Cotton T-Shirt", price: 39.99, quantity: 2, image: "https://m.media-amazon.com/images/I/412CaF5mwwL._SX385_.jpg?height=80&width=80" },
    ],
    shipping: {
      address: "123 Main St, New York, NY 10001",
      method: "Standard Shipping",
      tracking: null,
    },
  },
]

// Mock saved addresses
const mockAddresses = [
  {
    id: 1,
    type: "home",
    name: "Home Address",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States",
    isDefault: true,
  },
  {
    id: 2,
    type: "work",
    name: "Work Address",
    address: "456 Business Ave",
    city: "New York",
    state: "NY",
    zipCode: "10002",
    country: "United States",
    isDefault: false,
  },
]

// Mock payment methods
const mockPaymentMethods = [
  {
    id: 1,
    type: "card",
    brand: "visa",
    last4: "4242",
    expiryMonth: 12,
    expiryYear: 2025,
    isDefault: true,
  },
  {
    id: 2,
    type: "card",
    brand: "mastercard",
    last4: "8888",
    expiryMonth: 8,
    expiryYear: 2026,
    isDefault: false,
  },
]

export default function ProfilePage() {
  const { user, updateProfile, isAuthenticated } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    zipCode: user?.zipCode || "",
    country: user?.country || "",
  })

  const [preferences, setPreferences] = useState({
    newsletter: user?.preferences?.newsletter || false,
    notifications: user?.preferences?.notifications || true,
    marketing: user?.preferences?.marketing || false,
  })

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your profile</h1>
            <p className="text-gray-600">You need to be logged in to access this page.</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const handleSave = () => {
    updateProfile({
      ...formData,
      preferences,
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      city: user?.city || "",
      zipCode: user?.zipCode || "",
      country: user?.country || "",
    })
    setIsEditing(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-sans">My Account</h1>
          <p className="text-gray-600 mt-2">Manage your account settings, orders, and preferences</p>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="payment">Payment</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="orders">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-sans flex items-center gap-2">
                    <Package size={20} />
                    Order History
                  </CardTitle>
                  <p className="text-gray-600">Track and manage your orders</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4">
                          <div className="flex items-center gap-4 mb-4 lg:mb-0">
                            <div>
                              <h3 className="font-semibold text-gray-900">Order {order.id}</h3>
                              <p className="text-sm text-gray-600">
                                Placed on {new Date(order.date).toLocaleDateString()}
                              </p>
                            </div>
                            <Badge className={getStatusColor(order.status)}>{order.status.toUpperCase()}</Badge>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">${order.total.toFixed(2)}</p>
                            <p className="text-sm text-gray-600">{order.items.length} items</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Items</h4>
                            <div className="space-y-3">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                  <img
                                    src={item.image || "/placeholder.svg"}
                                    alt={item.name}
                                    className="w-12 h-12 object-cover rounded"
                                  />
                                  <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-600">
                                      Qty: {item.quantity} × ${item.price}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-medium text-gray-900 mb-3">Shipping Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-start gap-2">
                                <MapPin size={16} className="text-gray-400 mt-0.5" />
                                <p className="text-gray-600">{order.shipping.address}</p>
                              </div>
                              <p className="text-gray-600 ml-6">{order.shipping.method}</p>
                              {order.shipping.tracking && (
                                <p className="text-gray-600 ml-6">
                                  Tracking: <span className="font-mono">{order.shipping.tracking}</span>
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-3 mt-4 pt-4 border-t">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                          {order.status === "delivered" && (
                            <Button variant="outline" size="sm">
                              Reorder
                            </Button>
                          )}
                          {order.status === "shipped" && (
                            <Button variant="outline" size="sm">
                              Track Package
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img src={user.avatar || "/placeholder.svg"} alt={user.name} className="w-16 h-16 rounded-full" />
                  <div>
                    <CardTitle className="font-sans">{user.name}</CardTitle>
                    <p className="text-gray-600">{user.email}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar size={16} className="mr-1" />
                      Member since {new Date(user.joinDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-3 pt-4">
                    <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
                      Save Changes
                    </Button>
                    <Button onClick={handleCancel} variant="outline">
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-sans flex items-center gap-2">
                    <MapPin size={20} />
                    Saved Addresses
                  </CardTitle>
                  <p className="text-gray-600">Manage your shipping and billing addresses</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Add New Address</Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockAddresses.map((address) => (
                    <div key={address.id} className="border rounded-lg p-4 relative">
                      {address.isDefault && (
                        <Badge className="absolute top-2 right-2 bg-green-100 text-green-800">Default</Badge>
                      )}
                      <div className="space-y-2">
                        <h3 className="font-semibold text-gray-900 capitalize">{address.name}</h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{address.address}</p>
                          <p>
                            {address.city}, {address.state} {address.zipCode}
                          </p>
                          <p>{address.country}</p>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Delete
                          </Button>
                          {!address.isDefault && (
                            <Button variant="outline" size="sm">
                              Set Default
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="font-sans flex items-center gap-2">
                    <CreditCard size={20} />
                    Payment Methods
                  </CardTitle>
                  <p className="text-gray-600">Manage your saved payment methods</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Add Payment Method</Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPaymentMethods.map((method) => (
                    <div key={method.id} className="border rounded-lg p-4 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                          <CreditCard size={16} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 capitalize">
                            {method.brand} ending in {method.last4}
                          </p>
                          <p className="text-sm text-gray-600">
                            Expires {method.expiryMonth}/{method.expiryYear}
                          </p>
                        </div>
                        {method.isDefault && <Badge className="bg-green-100 text-green-800">Default</Badge>}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button variant="outline" size="sm">
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Communication Preferences</CardTitle>
                <p className="text-gray-600">Choose how you'd like to hear from us</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="newsletter"
                      checked={preferences.newsletter}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, newsletter: checked })}
                    />
                    <div>
                      <Label htmlFor="newsletter" className="font-medium">
                        Newsletter
                      </Label>
                      <p className="text-sm text-gray-600">
                        Receive our weekly newsletter with new arrivals and offers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="notifications"
                      checked={preferences.notifications}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, notifications: checked })}
                    />
                    <div>
                      <Label htmlFor="notifications" className="font-medium">
                        Order Notifications
                      </Label>
                      <p className="text-sm text-gray-600">Get updates about your orders and shipping</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id="marketing"
                      checked={preferences.marketing}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, marketing: checked })}
                    />
                    <div>
                      <Label htmlFor="marketing" className="font-medium">
                        Marketing Communications
                      </Label>
                      <p className="text-sm text-gray-600">Receive personalized offers and recommendations</p>
                    </div>
                  </div>
                </div>

                <Button onClick={() => updateProfile({ preferences })} className="bg-indigo-600 hover:bg-indigo-700">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle className="font-sans">Security Settings</CardTitle>
                <p className="text-gray-600">Manage your account security</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="text-green-600" size={24} />
                      <div>
                        <h4 className="font-medium">Password</h4>
                        <p className="text-sm text-gray-600">Last updated 30 days ago</p>
                      </div>
                    </div>
                    <Button variant="outline">Change Password</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Mail className="text-blue-600" size={24} />
                      <div>
                        <h4 className="font-medium">Email Address</h4>
                        <p className="text-sm text-gray-600">{user.email}</p>
                      </div>
                    </div>
                    <Button variant="outline">Change Email</Button>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="font-medium text-yellow-800 mb-2">Account Security Tips</h4>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• Use a strong, unique password</li>
                    <li>• Enable two-factor authentication when available</li>
                    <li>• Keep your email address up to date</li>
                    <li>• Review your account activity regularly</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  )
}
