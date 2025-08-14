"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { products, categories } from "@/data/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Filter, Grid, List } from "lucide-react"
import ProductCard from "@/components/product-card"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [searchQuery, setSearchQuery] = useState(query)
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState("grid")

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedBrands, setSelectedBrands] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [selectedSizes, setSelectedSizes] = useState([])
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState("featured")

  // Get unique values for filters
  const brands = [...new Set(products.map((p) => p.brand))]
  const colors = [...new Set(products.flatMap((p) => p.colors))]
  const sizes = [...new Set(products.flatMap((p) => p.sizes))]

  useEffect(() => {
    let filtered = products

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category))
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((product) => selectedBrands.includes(product.brand))
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter((product) => product.colors.some((color) => selectedColors.includes(color)))
    }

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter((product) => product.sizes.some((size) => selectedSizes.includes(size)))
    }

    // Price filter
    filtered = filtered.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Sort
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Featured - keep original order
        break
    }

    setFilteredProducts(filtered)
  }, [searchQuery, selectedCategories, selectedBrands, selectedColors, selectedSizes, priceRange, sortBy])

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setSelectedColors([])
    setSelectedSizes([])
    setPriceRange([0, 500])
    setSortBy("featured")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {query ? `Search Results for "${query}"` : "All Products"}
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 max-w-md">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter size={16} />
                Filters
              </Button>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid size={16} />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                >
                  <List size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <div className={`${showFilters ? "block" : "hidden"} lg:block w-64 flex-shrink-0`}>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>

              {/* Sort */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range: ${priceRange[0]} - ${priceRange[1]}
                </label>
                <Slider value={priceRange} onValueChange={setPriceRange} max={500} step={10} className="w-full" />
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                {categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedCategories([...selectedCategories, category.id])
                        } else {
                          setSelectedCategories(selectedCategories.filter((c) => c !== category.id))
                        }
                      }}
                    />
                    <label htmlFor={category.id} className="text-sm text-gray-700 capitalize">
                      {category.name}
                    </label>
                  </div>
                ))}
              </div>

              {/* Brands */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Brands</h4>
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={brand}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedBrands([...selectedBrands, brand])
                        } else {
                          setSelectedBrands(selectedBrands.filter((b) => b !== brand))
                        }
                      }}
                    />
                    <label htmlFor={brand} className="text-sm text-gray-700">
                      {brand}
                    </label>
                  </div>
                ))}
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Colors</h4>
                <div className="grid grid-cols-3 gap-2">
                  {colors.slice(0, 12).map((color) => (
                    <div key={color} className="flex items-center space-x-2">
                      <Checkbox
                        id={color}
                        checked={selectedColors.includes(color)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedColors([...selectedColors, color])
                          } else {
                            setSelectedColors(selectedColors.filter((c) => c !== color))
                          }
                        }}
                      />
                      <label htmlFor={color} className="text-xs text-gray-700">
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Sizes</h4>
                <div className="grid grid-cols-4 gap-2">
                  {sizes.slice(0, 16).map((size) => (
                    <div key={size} className="flex items-center space-x-1">
                      <Checkbox
                        id={size}
                        checked={selectedSizes.includes(size)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedSizes([...selectedSizes, size])
                          } else {
                            setSelectedSizes(selectedSizes.filter((s) => s !== size))
                          }
                        }}
                      />
                      <label htmlFor={size} className="text-xs text-gray-700">
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <Button onClick={clearFilters} className="mt-4">
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div
                className={`grid gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
