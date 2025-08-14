"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search, Heart, Menu, X } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import CartDrawer from "@/components/cart-drawer"
import AuthModal from "@/components/auth-modal"
import UserDropdown from "@/components/user-dropdown"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-300 ${
        isScrolled ? "shadow-lg backdrop-blur-sm bg-white/95" : "border-b border-gray-200"
      }`}
    >
      {/* Top banner with slide-down animation */}
      <div className="bg-gray-700 text-white text-center py-2 text-sm animate-slide-down">
        <div className="animate-fade-in">Free shipping on orders over $75 | 30-day returns</div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button with rotation animation */}
          <button
            className="md:hidden p-2 transition-transform duration-200 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className={`transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </div>
          </button>

          {/* Logo with hover animation */}
          <div className="flex-shrink-0">
            <Link href="/">
              <h1 className="text-2xl font-bold p-2 text-gray-900 font-sans transition-all duration-300 hover:scale-105 hover:text-indigo-600 animate-fade-in">
                FasHub
              </h1> 
            </Link>
          </div>

          {/* Desktop Navigation with stagger animation */}
          <nav className="hidden md:flex space-x-8">
            {[
              { href: "/search?q=", label: "New Arrivals" },
              { href: "/category/women", label: "Women" },
              { href: "/category/men", label: "Men" },
              { href: "/category/accessories", label: "Accessories" },
              { href: "/category/sale", label: "Sale" },
            ].map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-indigo-600 font-medium transition-all duration-300 hover:scale-105 relative group animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Search bar with focus animation */}
          <div className="hidden md:flex flex-1 max-w-md mx-8 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <form onSubmit={handleSearch} className="relative w-full group">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 transition-colors duration-300 group-focus-within:text-indigo-600"
                size={20}
              />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border-gray-300 focus:border-indigo-600 focus:ring-indigo-600 transition-all duration-300 focus:shadow-lg"
              />
            </form>
          </div>

          {/* Right icons with hover animations */}
          <div className="flex items-center space-x-4 animate-fade-in" style={{ animationDelay: "400ms" }}>
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <AuthModal>
                <button className="p-2 text-gray-700 hover:text-indigo-600 transition-all duration-300 hover:scale-110 hover:bg-gray-100 rounded-full">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
              </AuthModal>
            )}

            <Link
              href="/wishlist"
              className="p-2 text-gray-700 hover:text-indigo-600 transition-all duration-300 hover:scale-110 hover:bg-gray-100 rounded-full"
            >
              <Heart size={24} />
            </Link>
            <CartDrawer />
          </div>
        </div>

        {/* Mobile menu with slide animation */}
        <div
          className={`md:hidden border-t border-gray-200 transition-all duration-300 overflow-hidden ${
            isMenuOpen ? "max-h-96 py-4 opacity-100" : "max-h-0 py-0 opacity-0"
          }`}
        >
          <div className="flex flex-col space-y-4">
            <form onSubmit={handleSearch} className="mb-4">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="transition-all duration-300 focus:shadow-lg"
              />
            </form>
            {[
              { href: "/search?q=", label: "New Arrivals" },
              { href: "/category/women", label: "Women" },
              { href: "/category/men", label: "Men" },
              { href: "/category/accessories", label: "Accessories" },
              { href: "/category/sale", label: "Sale" },
            ].map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-indigo-600 font-medium transition-all duration-300 hover:translate-x-2 animate-slide-in"
                style={{ animationDelay: `${index * 50}ms` }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
