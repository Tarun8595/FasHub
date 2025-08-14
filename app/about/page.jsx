"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Heart, Users, Leaf, Award } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 font-sans mb-6">About StyleHub</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're passionate about bringing you the finest clothing and accessories that blend timeless style with
              modern comfort. Since our founding, we've been committed to quality, sustainability, and exceptional
              customer service.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 font-sans mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2020, StyleHub began as a small boutique with a simple mission: to make high-quality,
                  stylish clothing accessible to everyone. What started as a passion project has grown into a trusted
                  destination for fashion-forward individuals who value both style and substance.
                </p>
                <p>
                  We believe that great fashion should be sustainable, ethical, and inclusive. That's why we carefully
                  curate our collections from brands that share our values, ensuring that every piece in our store meets
                  our high standards for quality and responsibility.
                </p>
                <p>
                  Today, we're proud to serve customers worldwide, offering a carefully selected range of clothing and
                  accessories that help you express your unique style while feeling confident and comfortable.
                </p>
              </div>
            </div>
            <div>
              <img src="/placeholder.svg?height=500&width=600" alt="StyleHub team" className="rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 font-sans mb-4">Our Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do, from the products we choose to the way we serve our
              customers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality First</h3>
              <p className="text-gray-600">
                We source only the finest materials and work with skilled artisans to ensure every piece meets our
                exacting standards.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to reducing our environmental impact through sustainable practices and eco-friendly
                materials.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Inclusivity</h3>
              <p className="text-gray-600">
                Fashion is for everyone. We offer diverse sizing and styles to ensure everyone can find pieces they
                love.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Customer Care</h3>
              <p className="text-gray-600">
                Your satisfaction is our priority. We're here to help you find the perfect pieces and ensure a great
                shopping experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 font-sans mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind StyleHub who work tirelessly to bring you the best in fashion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Sarah Johnson"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Sarah Johnson</h3>
              <p className="text-indigo-600 mb-2">Founder & CEO</p>
              <p className="text-gray-600 text-sm">
                With 15 years in fashion retail, Sarah founded StyleHub to make quality fashion accessible to all.
              </p>
            </div>

            <div className="text-center">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Michael Chen"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Michael Chen</h3>
              <p className="text-indigo-600 mb-2">Creative Director</p>
              <p className="text-gray-600 text-sm">
                Michael brings his keen eye for design and trends to curate our collections and brand aesthetic.
              </p>
            </div>

            <div className="text-center">
              <img
                src="/placeholder.svg?height=300&width=300"
                alt="Emma Rodriguez"
                className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">Emma Rodriguez</h3>
              <p className="text-indigo-600 mb-2">Sustainability Director</p>
              <p className="text-gray-600 text-sm">
                Emma leads our sustainability initiatives, ensuring our practices align with our environmental values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white font-sans mb-4">Ready to Discover Your Style?</h2>
          <p className="text-indigo-100 text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust StyleHub for their fashion needs.
          </p>
          <Link href="/search">
            <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100">
              Shop Now
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
