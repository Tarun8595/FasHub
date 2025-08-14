import { Button } from "@/components/ui/button"

const categories = [
  {
    id: 1,
    name: "Women's Collection",
    description: "Discover the latest trends",
    image: "https://i.pinimg.com/1200x/d5/20/7e/d5207e6c95dc71e640c4f2a378c78e10.jpg?height=400&width=600",
    itemCount: "200+ items",
  },
  {
    id: 2,
    name: "Men's Essentials",
    description: "Timeless pieces for every occasion",
    image: "https://i.pinimg.com/1200x/93/54/16/935416d1a1f73960de4487ce62c210d7.jpg?height=400&width=600",
    itemCount: "150+ items",
  },
  {
    id: 3,
    name: "Accessories",
    description: "Complete your look",
    image: "https://i.pinimg.com/736x/bd/77/33/bd77336509fb4f32e8d369cdf9a224cd.jpg?height=400&width=600",
    itemCount: "80+ items",
  },
  {
    id: 4,
    name: "Summer Sale",
    description: "Up to 50% off selected items",
    image: "https://i.pinimg.com/736x/00/b5/f6/00b5f6d5c23eb3240bd76a10c8424f8b.jpg?height=400&width=600",
    itemCount: "100+ items",
  },
]

export default function CategoryGrid() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-sans">Shop by Category</h2>
          <p className="mt-4 text-lg text-gray-600">Find exactly what you're looking for</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <div
              key={category.id}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="absolute inset-0 bg-opacity-40 group-hover:bg-opacity-50 transition-all duration-300" />

              <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-6">
                <h3 className="text-2xl font-bold mb-2 font-sans">{category.name}</h3>
                <p className="text-lg mb-2 opacity-90">{category.description}</p>
                <p className="text-sm mb-4 opacity-75">{category.itemCount}</p>
                <Button className="bg-white text-gray-900 hover:bg-gray-100 transition-colors">Shop Now</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
