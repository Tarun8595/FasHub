"use client"


import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Eye, Package, Truck } from "lucide-react"

// Mock order data
const initialOrders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    amount: 129.99,
    status: "completed",
    date: "2024-01-15",
    items: [
      { name: "Essential Cotton Tee", quantity: 2, price: 29.99 },
      { name: "Denim Jacket Classic", quantity: 1, price: 89.99 },
    ],
    shipping: {
      address: "123 Main St, New York, NY 10001",
      method: "Standard Shipping",
    },
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    amount: 89.5,
    status: "processing",
    date: "2024-01-15",
    items: [{ name: "Floral Summer Dress", quantity: 1, price: 79.99 }],
    shipping: {
      address: "456 Oak Ave, Los Angeles, CA 90210",
      method: "Express Shipping",
    },
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    amount: 199.99,
    status: "shipped",
    date: "2024-01-14",
    items: [
      { name: "Leather Ankle Boots", quantity: 1, price: 149.99 },
      { name: "Essential Cotton Tee", quantity: 1, price: 29.99 },
    ],
    shipping: {
      address: "789 Pine St, Chicago, IL 60601",
      method: "Overnight Shipping",
    },
  },
]

export default function OrderManagement() {
  const [orders, setOrders] = useState(initialOrders)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedOrder, setSelectedOrder] = useState(null)

  const statuses = ["all", "pending", "processing", "shipped", "completed", "cancelled"]

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || order.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 font-sans">Order Management</h1>
        <p className="text-gray-600">Track and manage customer orders</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search orders, customers, or emails..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status === "all" ? "All Statuses" : status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Orders ({filteredOrders.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Order ID</th>
                  <th className="text-left py-3 px-4">Customer</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Amount</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">{order.id}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.customer}</p>
                        <p className="text-sm text-gray-600">{order.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900">{order.date}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">{formatPrice(order.amount)}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Select value={order.status} onValueChange={(value) => updateOrderStatus(order.id, value)}>
                        <SelectTrigger className="w-32">
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                        </SelectTrigger>
                        <SelectContent>
                          {statuses
                            .filter((s) => s !== "all")
                            .map((status) => (
                              <SelectItem key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedOrder(order)}>
                              <Eye size={16} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="font-sans">Order Details - {order.id}</DialogTitle>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="space-y-6">
                                {/* Customer Info */}
                                <div>
                                  <h3 className="font-semibold mb-2">Customer Information</h3>
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <p>
                                      <strong>Name:</strong> {selectedOrder.customer}
                                    </p>
                                    <p>
                                      <strong>Email:</strong> {selectedOrder.email}
                                    </p>
                                    <p>
                                      <strong>Order Date:</strong> {selectedOrder.date}
                                    </p>
                                  </div>
                                </div>

                                {/* Shipping Info */}
                                <div>
                                  <h3 className="font-semibold mb-2">Shipping Information</h3>
                                  <div className="bg-gray-50 p-4 rounded-lg">
                                    <p>
                                      <strong>Address:</strong> {selectedOrder.shipping.address}
                                    </p>
                                    <p>
                                      <strong>Method:</strong> {selectedOrder.shipping.method}
                                    </p>
                                  </div>
                                </div>

                                {/* Order Items */}
                                <div>
                                  <h3 className="font-semibold mb-2">Order Items</h3>
                                  <div className="space-y-2">
                                    {selectedOrder.items.map((item, index) => (
                                      <div
                                        key={index}
                                        className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                                      >
                                        <div>
                                          <p className="font-medium">{item.name}</p>
                                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                        </div>
                                        <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                                      </div>
                                    ))}
                                  </div>
                                  <div className="mt-4 pt-4 border-t">
                                    <div className="flex justify-between items-center">
                                      <span className="font-semibold">Total:</span>
                                      <span className="font-semibold text-lg">{formatPrice(selectedOrder.amount)}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm">
                          <Package size={16} />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Truck size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
