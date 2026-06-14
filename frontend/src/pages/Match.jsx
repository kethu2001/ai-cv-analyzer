import { useState } from 'react'
import axios from 'axios'

function Match() {
  const [file, setFile] = useState(null)
  const [jobDesc, setJobDesc] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleSubmit = async () => {
    if (!file || !jobDesc) return
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('job_description', jobDesc)
      const res = await axios.post('http://127.0.0.1:8000/api/cv/match', formData)
      setResult(res.data)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result.cover_letter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const scoreColor = (score) => {
    if (score >= 75) return 'text-green-400'
    if (score >= 50) return 'text-yellow-400'
    return 'text-red-400'
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-white mb-2">Job Matcher</h1>
      <p className="text-gray-400 mb-10">See how well your CV matches a job description</p>

      {/* Upload CV */}
      <div className="bg-gray-900 border-2 border-dashed border-gray-700 rounded-2xl p-8 text-center mb-6 hover:border-violet-500 transition-all duration-200">
        <div className="text-4xl mb-3">📄</div>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
          id="cv-match-upload"
        />
        <label
          htmlFor="cv-match-upload"
          className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-6 py-3 rounded-xl cursor-pointer transition-all duration-200"
        >
          Upload CV (PDF)
        </label>
        {file && <p className="text-violet-400 mt-3 font-medium">✅ {file.name}</p>}
      </div>

      {/* Job Description */}
      <textarea
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        placeholder="Paste the job description here..."
        rows={6}
        className="w-full bg-gray-900 border border-gray-700 rounded-2xl p-4 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-violet-500 transition-all duration-200 mb-6 resize-none"
      />

      {/* Match Button */}
      <button
        onClick={handleSubmit}
        disabled={!file || !jobDesc || loading}
        className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-200 text-lg mb-8"
      >
        {loading ? '🤖 Matching...' : '🎯 Match My CV'}
      </button>

      {error && <p className="text-red-400 text-center mb-6">{error}</p>}

      {/* Results */}
      {result && (
        <div className="space-y-6">

          {/* Match Score */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-center">
            <h2 className="text-white font-bold text-xl mb-2">Match Score</h2>
            <div className={`text-7xl font-bold ${scoreColor(result.match_score)}`}>
              {result.match_score}%
            </div>
            <p className="text-gray-400 mt-2">
              {result.match_score >= 75 ? '🎉 Great match!' : result.match_score >= 50 ? '👍 Good match, some gaps to fill' : '💪 Keep improving your skills'}
            </p>
          </div>

          {/* Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-green-500/20 rounded-2xl p-6">
              <h2 className="text-green-400 font-bold text-xl mb-4">✅ Matching Skills</h2>
              <ul className="space-y-2">
                {result.matching_skills.map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <span className="w-2 h-2 bg-green-400 rounded-full"></span> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-gray-900 border border-red-500/20 rounded-2xl p-6">
              <h2 className="text-red-400 font-bold text-xl mb-4">❌ Missing Skills</h2>
              <ul className="space-y-2">
                {result.missing_skills.map((s, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Cover Letter */}
          <div className="bg-gray-900 border border-violet-500/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-violet-400 font-bold text-xl">✉️ Cover Letter</h2>
              <button
                onClick={copyToClipboard}
                className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
              >
                {copied ? '✅ Copied!' : '📋 Copy'}
              </button>
            </div>
            <p className="text-gray-300 whitespace-pre-line leading-relaxed">{result.cover_letter}</p>
          </div>

        </div>
      )}
    </div>
  )
}

export default Match