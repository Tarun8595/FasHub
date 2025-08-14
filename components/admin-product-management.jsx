"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react"

// Mock product data
const initialProducts = [
  {
    id: 1,
    name: "Essential Cotton Tee",
    price: 29.99,
    originalPrice: 39.99,
    category: "Basics",
    stock: 150,
    status: "active",
    image: "https://i.pinimg.com/1200x/49/83/36/498336d3845fffd6a16de7d3369f429f.jpg?height=100&width=100",
    description: "Comfortable cotton t-shirt perfect for everyday wear",
    colors: ["white", "black", "gray"],
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    name: "Denim Jacket Classic",
    price: 89.99,
    category: "Outerwear",
    stock: 75,
    status: "active",
    image: "https://i.pinimg.com/736x/7d/c8/c3/7dc8c3b9c3f16b0a6eb88289455e57ac.jpg?height=100&width=100",
    description: "Classic denim jacket with modern fit",
    colors: ["blue", "black", "white"],
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: "Floral Summer Dress",
    price: 79.99,
    category: "Dresses",
    stock: 0,
    status: "out_of_stock",
    image: "https://i.pinimg.com/1200x/ed/43/a8/ed43a8b14d417ed7161a59de1500f0f5.jpg?height=100&width=100",
    description: "Beautiful floral dress perfect for summer occasions",
    colors: ["floral", "navy", "pink"],
    sizes: ["XS", "S", "M", "L"],
  },
]

export default function ProductManagement() {
  const [products, setProducts] = useState(initialProducts)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  const [productForm, setProductForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    category: "",
    stock: "",
    description: "",
    colors: "",
    sizes: "",
  })

  const categories = ["all", "Basics", "Outerwear", "Dresses", "Shoes", "Accessories"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddProduct = () => {
    const newProduct = {
      id: Date.now(),
      ...productForm,
      price: Number.parseFloat(productForm.price),
      originalPrice: productForm.originalPrice ? Number.parseFloat(productForm.originalPrice) : null,
      stock: Number.parseInt(productForm.stock),
      status: Number.parseInt(productForm.stock) > 0 ? "active" : "out_of_stock",
      image: "/placeholder.svg?height=100&width=100",
      colors: productForm.colors.split(",").map((c) => c.trim()),
      sizes: productForm.sizes.split(",").map((s) => s.trim()),
    }

    setProducts([...products, newProduct])
    setProductForm({
      name: "",
      price: "",
      originalPrice: "",
      category: "",
      stock: "",
      description: "",
      colors: "",
      sizes: "",
    })
    setIsAddModalOpen(false)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setProductForm({
      name: product.name,
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      category: product.category,
      stock: product.stock.toString(),
      description: product.description,
      colors: product.colors.join(", "),
      sizes: product.sizes.join(", "),
    })
  }

  const handleUpdateProduct = () => {
    const updatedProduct = {
      ...editingProduct,
      ...productForm,
      price: Number.parseFloat(productForm.price),
      originalPrice: productForm.originalPrice ? Number.parseFloat(productForm.originalPrice) : null,
      stock: Number.parseInt(productForm.stock),
      status: Number.parseInt(productForm.stock) > 0 ? "active" : "out_of_stock",
      colors: productForm.colors.split(",").map((c) => c.trim()),
      sizes: productForm.sizes.split(",").map((s) => s.trim()),
    }

    setProducts(products.map((p) => (p.id === editingProduct.id ? updatedProduct : p)))
    setEditingProduct(null)
    setProductForm({
      name: "",
      price: "",
      originalPrice: "",
      category: "",
      stock: "",
      description: "",
      colors: "",
      sizes: "",
    })
  }

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "out_of_stock":
        return "bg-red-100 text-red-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-sans">Product Management</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus size={20} className="mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-sans">Add New Product</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={productForm.category}
                  onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter((c) => c !== "all")
                      .map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price (optional)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  step="0.01"
                  value={productForm.originalPrice}
                  onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  value={productForm.stock}
                  onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="colors">Colors (comma-separated)</Label>
                <Input
                  id="colors"
                  value={productForm.colors}
                  onChange={(e) => setProductForm({ ...productForm, colors: e.target.value })}
                  placeholder="white, black, blue"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="sizes">Sizes (comma-separated)</Label>
                <Input
                  id="sizes"
                  value={productForm.sizes}
                  onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                  placeholder="XS, S, M, L, XL"
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddProduct} className="bg-indigo-600 hover:bg-indigo-700">
                Add Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="font-sans">Products ({filteredProducts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Product</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Stock</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-md"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600 truncate max-w-xs">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{product.category}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div>
                        <span className="font-medium">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={product.stock === 0 ? "text-red-600" : "text-gray-900"}>{product.stock}</span>
                    </td>
                    <td className="py-4 px-4">
                      <Badge className={getStatusColor(product.status)}>{product.status.replace("_", " ")}</Badge>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 size={16} />
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

      {/* Edit Product Modal */}
      {editingProduct && (
        <Dialog open={!!editingProduct} onOpenChange={() => setEditingProduct(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-sans">Edit Product</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Product Name</Label>
                <Input
                  id="edit-name"
                  value={productForm.name}
                  onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Select
                  value={productForm.category}
                  onValueChange={(value) => setProductForm({ ...productForm, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories
                      .filter((c) => c !== "all")
                      .map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={productForm.price}
                  onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-originalPrice">Original Price (optional)</Label>
                <Input
                  id="edit-originalPrice"
                  type="number"
                  step="0.01"
                  value={productForm.originalPrice}
                  onChange={(e) => setProductForm({ ...productForm, originalPrice: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-stock">Stock Quantity</Label>
                <Input
                  id="edit-stock"
                  type="number"
                  value={productForm.stock}
                  onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-colors">Colors (comma-separated)</Label>
                <Input
                  id="edit-colors"
                  value={productForm.colors}
                  onChange={(e) => setProductForm({ ...productForm, colors: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-sizes">Sizes (comma-separated)</Label>
                <Input
                  id="edit-sizes"
                  value={productForm.sizes}
                  onChange={(e) => setProductForm({ ...productForm, sizes: e.target.value })}
                />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setEditingProduct(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateProduct} className="bg-indigo-600 hover:bg-indigo-700">
                Update Product
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
