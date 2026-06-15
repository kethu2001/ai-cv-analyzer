import { useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader'

function Analyze() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = async () => {
    if (!file) return
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await axios.post('http://127.0.0.1:8000/api/cv/analyze', formData)
      setResult(res.data)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-white mb-2">Analyze Your CV</h1>
      <p className="text-gray-400 mb-10">Upload your CV and get instant AI-powered feedback</p>

      {/* Upload Box */}
      <div className="bg-gray-900 border-2 border-dashed border-gray-700 rounded-2xl p-10 text-center mb-6 hover:border-violet-500 transition-all duration-200">
        <div className="text-5xl mb-4">📄</div>
        <p className="text-gray-400 mb-4">Drag and drop your CV or click to browse</p>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
          id="cv-upload"
        />
        <label
          htmlFor="cv-upload"
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl cursor-pointer transition-all duration-200"
        >
          Browse PDF
        </label>
        {file && (
          <p className="text-violet-400 mt-4 font-medium">✅ {file.name}</p>
        )}
      </div>

      {/* Analyze Button */}
      <button
        onClick={handleSubmit}
        disabled={!file || loading}
        className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-200 text-lg mb-8"
      >
        {loading ? '🤖 Analyzing your CV...' : '🚀 Analyze My CV'}
      </button>


      {loading && <Loader message="Analyzing your CV..." />}

      {error && <p className="text-red-400 text-center mb-6">{error}</p>}

      {/* Results */}
      {result && (
        <div className="space-y-6">

          {/* Summary */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-bold text-xl mb-3">📋 Summary</h2>
            <p className="text-gray-300">{result.summary}</p>
          </div>

          {/* Strengths & Gaps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-green-500/20 rounded-2xl p-6">
              <h2 className="text-green-400 font-bold text-xl mb-4">💪 Strengths</h2>
              <ul className="space-y-2">
                {result.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <span className="text-green-400 mt-1">✓</span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-900 border border-red-500/20 rounded-2xl p-6">
              <h2 className="text-red-400 font-bold text-xl mb-4">📉 Skill Gaps</h2>
              <ul className="space-y-2">
                {result.skill_gaps.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-gray-300">
                    <span className="text-red-400 mt-1">✗</span> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gray-900 border border-violet-500/20 rounded-2xl p-6">
            <h2 className="text-violet-400 font-bold text-xl mb-4">💡 Recommendations</h2>
            <ul className="space-y-3">
              {result.recommendations.map((r, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-300">
                  <span className="bg-violet-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  )
}

export default Analyze