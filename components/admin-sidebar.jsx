"use client"

import { Button } from "@/components/ui/button"
import { LayoutDashboard, Package, ShoppingBag, Users, BarChart3, Settings, ArrowLeft } from "lucide-react"
import Link from "next/link"

const sidebarItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "products", label: "Products", icon: Package },
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "users", label: "Users", icon: Users },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "settings", label: "Settings", icon: Settings },
]

export default function AdminSidebar({ activeTab, setActiveTab }) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <Link href="/" className="flex items-center text-indigo-600 hover:text-indigo-700 transition-colors mb-8">
          <ArrowLeft size={20} className="mr-2" />
          Back to Store
        </Link>

        <nav className="space-y-2">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              className={`w-full justify-start ${
                activeTab === item.id
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={20} className="mr-3" />
              {item.label}
            </Button>
          ))}
        </nav>
      </div>
    </aside>
  )
}
