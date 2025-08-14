"use client"

import { Button } from "@/components/ui/button"
import { Bell, Search, Settings } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import UserDropdown from "@/components/user-dropdown"

export default function AdminHeader() {
  const { user } = useAuth()

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900 font-sans">FasHub Admin</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-10 w-64 border-gray-300 focus:border-indigo-600 focus:ring-indigo-600"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Settings */}
          <Button variant="ghost" size="sm">
            <Settings size={20} />
          </Button>

          {/* User Dropdown */}
          <UserDropdown />
        </div>
      </div>
    </header>
  )
}
