import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Analyze from './pages/Analyze'
import Match from './pages/Match'
import Interview from './pages/Interview'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
          <Route path="/match" element={<Match />} />
          <Route path="/interview" element={<Interview />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App