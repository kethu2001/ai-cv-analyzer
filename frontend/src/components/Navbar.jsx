import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  const navLink = (path, label) => (
    <Link
      to={path}
      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 
        ${location.pathname === path
          ? 'bg-violet-600 text-white'
          : 'text-gray-400 hover:text-white hover:bg-gray-800'
        }`}
    >
      {label}
    </Link>
  )

  return (
    <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            IQ
          </div>
          <span className="text-white font-bold text-xl">CareerIQ</span>
          <span className="text-violet-400 font-bold text-xl">AI</span>
        </Link>

        {/* Narvar links */}
        <div className="flex items-center gap-2">
          {navLink('/', 'Home')}
          {navLink('/analyze', 'Analyze CV')}
          {navLink('/match', 'Job Match')}
          {navLink('/interview', 'Interview Prep')}
        </div>
      </div>
    </nav>
  )
}

export default Navbar