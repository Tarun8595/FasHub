import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Newsletter() {
  return (
    <section className="py-16 bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl font-sans">Join Our Style Community</h2>
          <p className="mt-4 text-lg text-indigo-100">
            Get exclusive access to new collections, style tips, and special offers
          </p>

          <div className="mt-8 max-w-md mx-auto">
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white border-white text-gray-900 placeholder-gray-500"
              />
              <Button className="bg-gray-900 text-white hover:bg-gray-800 px-6">Subscribe</Button>
            </div>
            <p className="mt-3 text-sm text-indigo-200">No spam, unsubscribe at any time</p>
          </div>
        </div>
      </div>
    </section>
  )
}
