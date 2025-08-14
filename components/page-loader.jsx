"use client"

import { useEffect, useState } from "react"

export default function PageLoader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      {/* Animated logo */}
      <div className="mb-8 animate-pulse">
        <h1 className="text-4xl font-bold text-gray-900 font-sans animate-fade-in">StyleHub</h1>
        <div className="w-full h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Fashion-themed loading animation */}
      <div className="relative">
        {/* Rotating fashion icons */}
        <div className="w-24 h-24 relative animate-spin" style={{ animationDuration: "3s" }}>
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-indigo-600 rounded-full"></div>
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 w-3 h-3 bg-purple-600 rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-pink-600 rounded-full"></div>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 w-3 h-3 bg-blue-600 rounded-full"></div>
        </div>

        {/* Center icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Loading text */}
      <p className="mt-8 text-gray-600 font-medium animate-pulse">Preparing your fashion experience...</p>

      {/* Progress percentage */}
      <p className="mt-2 text-sm text-gray-400">{Math.round(progress)}%</p>
    </div>
  )
}
