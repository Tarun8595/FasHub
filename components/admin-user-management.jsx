"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Eye, Mail, Ban, UserCheck } from "lucide-react"

// Mock user data
const initialUsers = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    joinDate: "2024-01-10",
    status: "active",
    orders: 5,
    totalSpent: 450.75,
    lastLogin: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    joinDate: "2024-01-08",
    status: "active",
    orders: 3,
    totalSpent: 289.5,
    lastLogin: "2024-01-14",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    joinDate: "2024-01-05",
    status: "inactive",
    orders: 1,
    totalSpent: 79.99,
    lastLogin: "2024-01-10",
  },
]

export default function UserManagement() {
  const [users, setUsers] = useState(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedUser, setSelectedUser] = useState(null)

  const statuses = ["all", "active", "inactive", "banned"]

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-yellow-100 text-yellow-800"
      case "banned":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const updateUserStatus = (userId, newStatus) => {
    setUsers(users.map((user) => (user.id === userId ? { ...user, status: newStatus } : user)))
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
        <h1 className="text-3xl font-bold text-gray-900 font-sans">User Management</h1>
        <p className="text-gray-600">Manage customer accounts and activity</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search users by name or email..."
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

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">User</th>
                  <th className="text-left py-3 px-4">Join Date</th>
                  <th className="text-left py-3 px-4">Orders</th>
                  <th className="text-left py-3 px-4">Total Spent</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                          <span className="text-indigo-600 font-medium">
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900">{user.joinDate}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-gray-900">{user.orders}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-gray-900">{formatPrice(user.totalSpent)}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm" onClick={() => setSelectedUser(user)}>
                              <Eye size={16} />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle className="font-sans">User Details - {user.name}</DialogTitle>
                            </DialogHeader>
                            {selectedUser && (
                              <div className="space-y-6">
                                {/* User Info */}
                                <div>
                                  <h3 className="font-semibold mb-2">User Information</h3>
                                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                    <p>
                                      <strong>Name:</strong> {selectedUser.name}
                                    </p>
                                    <p>
                                      <strong>Email:</strong> {selectedUser.email}
                                    </p>
                                    <p>
                                      <strong>Join Date:</strong> {selectedUser.joinDate}
                                    </p>
                                    <p>
                                      <strong>Last Login:</strong> {selectedUser.lastLogin}
                                    </p>
                                    <p>
                                      <strong>Status:</strong>
                                      <Badge className={`ml-2 ${getStatusColor(selectedUser.status)}`}>
                                        {selectedUser.status}
                                      </Badge>
                                    </p>
                                  </div>
                                </div>

                                {/* Order Statistics */}
                                <div>
                                  <h3 className="font-semibold mb-2">Order Statistics</h3>
                                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                                    <p>
                                      <strong>Total Orders:</strong> {selectedUser.orders}
                                    </p>
                                    <p>
                                      <strong>Total Spent:</strong> {formatPrice(selectedUser.totalSpent)}
                                    </p>
                                    <p>
                                      <strong>Average Order Value:</strong>{" "}
                                      {formatPrice(selectedUser.totalSpent / selectedUser.orders)}
                                    </p>
                                  </div>
                                </div>

                                {/* Actions */}
                                <div>
                                  <h3 className="font-semibold mb-2">Actions</h3>
                                  <div className="flex space-x-2">
                                    <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() =>
                                        updateUserStatus(
                                          selectedUser.id,
                                          selectedUser.status === "active" ? "inactive" : "active",
                                        )
                                      }
                                    >
                                      {selectedUser.status === "active" ? "Deactivate" : "Activate"}
                                    </Button>
                                    <Button variant="outline" size="sm">
                                      Send Email
                                    </Button>
                                    <Button variant="outline" size="sm" className="text-red-600 bg-transparent">
                                      Ban User
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="sm">
                          <Mail size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateUserStatus(user.id, user.status === "active" ? "inactive" : "active")}
                        >
                          {user.status === "active" ? <Ban size={16} /> : <UserCheck size={16} />}
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
