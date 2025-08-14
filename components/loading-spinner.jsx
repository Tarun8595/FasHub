"use client"

export default function LoadingSpinner({ size = "default", text = "Loading..." }) {
  const sizeClasses = {
    small: "w-6 h-6",
    default: "w-12 h-12",
    large: "w-16 h-16",
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Animated spinner */}
      <div className="relative">
        <div
          className={`${sizeClasses[size]} border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin`}
        ></div>
        <div
          className={`absolute inset-0 ${sizeClasses[size]} border-4 border-transparent border-r-indigo-400 rounded-full animate-spin`}
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>
      </div>

      {/* Loading text with pulse animation */}
      <p className="text-gray-600 font-medium animate-pulse">{text}</p>

      {/* Loading dots */}
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
        <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>
    </div>
  )
}
