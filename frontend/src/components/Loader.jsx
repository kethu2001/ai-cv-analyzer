function Loader({ message = "AI is thinking..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      
      {/* Spinning Circle */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-gray-700"></div>
        <div className="absolute inset-0 rounded-full border-4 border-violet-500 border-t-transparent animate-spin"></div>
      </div>

      {/* Dots */}
      <div className="flex gap-2">
        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
        <div className="w-2 h-2 bg-violet-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
      </div>

      
      <p className="text-gray-400 text-sm animate-pulse">{message}</p>

    </div>
  )
}

export default Loader