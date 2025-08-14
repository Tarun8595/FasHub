"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { ShoppingBag, Users, Package, DollarSign, TrendingUp, TrendingDown } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import AdminHeader from "@/components/admin-header"
import AdminSidebar from "@/components/admin-sidebar"
import ProductManagement from "@/components/admin-product-management"
import OrderManagement from "@/components/admin-order-management"
import UserManagement from "@/components/admin-user-management"
import { Button } from "@/components/ui/button"

// Mock data for dashboard
const dashboardStats = {
  totalRevenue: 45231.89,
  totalOrders: 1234,
  totalProducts: 89,
  totalUsers: 2456,
  revenueChange: 12.5,
  ordersChange: -2.3,
  productsChange: 5.2,
  usersChange: 8.1,
}

const recentOrders = [
  { id: "ORD-001", customer: "John Doe", amount: 129.99, status: "completed", date: "2024-01-15" },
  { id: "ORD-002", customer: "Jane Smith", amount: 89.5, status: "processing", date: "2024-01-15" },
  { id: "ORD-003", customer: "Mike Johnson", amount: 199.99, status: "shipped", date: "2024-01-14" },
  { id: "ORD-004", customer: "Sarah Wilson", amount: 75.25, status: "pending", date: "2024-01-14" },
  { id: "ORD-005", customer: "Tom Brown", amount: 159.99, status: "completed", date: "2024-01-13" },
]

const topProducts = [
  { name: "Essential Cotton Tee", sales: 145, revenue: 4350.0 },
  { name: "Denim Jacket Classic", sales: 89, revenue: 8009.11 },
  { name: "Floral Summer Dress", sales: 76, revenue: 6079.24 },
  { name: "Leather Ankle Boots", sales: 54, revenue: 8099.46 },
]

export default function AdminDashboard() {
  const { user, isAuthenticated } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")

  // Simple admin check - in real app, this would be role-based
  const isAdmin = user?.email?.includes("admin") || user?.firstName === "Admin"

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center font-sans">Access Denied</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">You need admin privileges to access this page.</p>
            <p className="text-sm text-gray-500">
              For demo purposes, sign up with an email containing "admin" or use "Admin" as first name.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100"
      case "processing":
        return "text-blue-600 bg-blue-100"
      case "shipped":
        return "text-purple-600 bg-purple-100"
      case "pending":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      <div className="flex">
        <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2 font-sans">Dashboard Overview</h1>
                  <p className="text-gray-600">
                    Welcome back, {user.firstName}! Here's what's happening with your store.
                  </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                          <p className="text-2xl font-bold text-gray-900">{formatPrice(dashboardStats.totalRevenue)}</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-green-600" />
                      </div>
                      <div className="flex items-center mt-4">
                        {dashboardStats.revenueChange > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                        )}
                        <span
                          className={`text-sm font-medium ${dashboardStats.revenueChange > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {Math.abs(dashboardStats.revenueChange)}%
                        </span>
                        <span className="text-sm text-gray-600 ml-1">from last month</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Orders</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {dashboardStats.totalOrders.toLocaleString()}
                          </p>
                        </div>
                        <ShoppingBag className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="flex items-center mt-4">
                        {dashboardStats.ordersChange > 0 ? (
                          <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                        )}
                        <span
                          className={`text-sm font-medium ${dashboardStats.ordersChange > 0 ? "text-green-600" : "text-red-600"}`}
                        >
                          {Math.abs(dashboardStats.ordersChange)}%
                        </span>
                        <span className="text-sm text-gray-600 ml-1">from last month</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Products</p>
                          <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalProducts}</p>
                        </div>
                        <Package className="h-8 w-8 text-purple-600" />
                      </div>
                      <div className="flex items-center mt-4">
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-sm font-medium text-green-600">{dashboardStats.productsChange}%</span>
                        <span className="text-sm text-gray-600 ml-1">from last month</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Total Users</p>
                          <p className="text-2xl font-bold text-gray-900">
                            {dashboardStats.totalUsers.toLocaleString()}
                          </p>
                        </div>
                        <Users className="h-8 w-8 text-indigo-600" />
                      </div>
                      <div className="flex items-center mt-4">
                        <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                        <span className="text-sm font-medium text-green-600">{dashboardStats.usersChange}%</span>
                        <span className="text-sm text-gray-600 ml-1">from last month</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Orders */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-sans">Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentOrders.map((order) => (
                          <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{order.id}</p>
                              <p className="text-sm text-gray-600">{order.customer}</p>
                              <p className="text-xs text-gray-500">{order.date}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">{formatPrice(order.amount)}</p>
                              <span
                                className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                              >
                                {order.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full mt-4 bg-transparent">
                        View All Orders
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Top Products */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="font-sans">Top Products</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topProducts.map((product, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium text-gray-900">{product.name}</p>
                              <p className="text-sm text-gray-600">{product.sales} sales</p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">{formatPrice(product.revenue)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full mt-4 bg-transparent">
                        View All Products
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Products Tab */}
              <TabsContent value="products">
                <ProductManagement />
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <OrderManagement />
              </TabsContent>

              {/* Users Tab */}
              <TabsContent value="users">
                <UserManagement />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}
