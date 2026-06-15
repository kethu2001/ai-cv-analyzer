import { useState } from 'react'
import axios from 'axios'

function Interview() {
  const [file, setFile] = useState(null)
  const [jobDesc, setJobDesc] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [openTip, setOpenTip] = useState(null)

  const handleSubmit = async () => {
    if (!file || !jobDesc) return
    setLoading(true)
    setError(null)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('job_description', jobDesc)
      const res = await axios.post('http://127.0.0.1:8000/api/cv/interview', formData)
      setResult(res.data)
    } catch (err) {
      setError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const toggleTip = (key) => {
    setOpenTip(openTip === key ? null : key)
  }

  const QuestionCard = ({ q, index, category }) => {
    const key = `${category}-${index}`
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 hover:border-violet-500/50 transition-all duration-200">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <span className="bg-violet-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              {index + 1}
            </span>
            <p className="text-gray-200 font-medium">{q.question}</p>
          </div>
          <button
            onClick={() => toggleTip(key)}
            className="text-violet-400 hover:text-violet-300 text-xs font-medium px-3 py-1 bg-violet-500/10 rounded-lg flex-shrink-0 transition-all duration-200"
          >
            {openTip === key ? 'Hide Tip' : '💡 Tip'}
          </button>
        </div>
        {openTip === key && (
          <div className="mt-3 ml-9 bg-violet-500/10 border border-violet-500/20 rounded-lg p-3">
            <p className="text-violet-300 text-sm">{q.tip}</p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-white mb-2">Interview Prep</h1>
      <p className="text-gray-400 mb-10">Get personalized interview questions based on your CV and the job</p>

      {/* Upload CV */}
      <div className="bg-gray-900 border-2 border-dashed border-gray-700 rounded-2xl p-8 text-center mb-6 hover:border-violet-500 transition-all duration-200">
        <div className="text-4xl mb-3">📄</div>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
          id="cv-interview-upload"
        />
        <label
          htmlFor="cv-interview-upload"
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

      {/* Generate Button */}
      <button
        onClick={handleSubmit}
        disabled={!file || !jobDesc || loading}
        className="w-full bg-violet-600 hover:bg-violet-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white font-semibold py-4 rounded-xl transition-all duration-200 text-lg mb-8"
      >
        {loading ? '🤖 Generating Questions...' : '🎯 Generate Interview Questions'}
      </button>

      {error && <p className="text-red-400 text-center mb-6">{error}</p>}

      {/* Results */}
      {result && (
        <div className="space-y-8">

          {/* Technical Questions */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-blue-400 font-bold text-xl mb-5">
              💻 Technical Questions
              <span className="text-gray-500 text-sm font-normal ml-2">({result.technical.length} questions)</span>
            </h2>
            <div className="space-y-3">
              {result.technical.map((q, i) => (
                <QuestionCard key={i} q={q} index={i} category="tech" />
              ))}
            </div>
          </div>

          {/* Behavioral Questions */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-green-400 font-bold text-xl mb-5">
              🤝 Behavioral Questions
              <span className="text-gray-500 text-sm font-normal ml-2">({result.behavioral.length} questions)</span>
            </h2>
            <div className="space-y-3">
              {result.behavioral.map((q, i) => (
                <QuestionCard key={i} q={q} index={i} category="behavioral" />
              ))}
            </div>
          </div>

          {/* CV Specific Questions */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-yellow-400 font-bold text-xl mb-5">
              📋 CV Specific Questions
              <span className="text-gray-500 text-sm font-normal ml-2">({result.cv_specific.length} questions)</span>
            </h2>
            <div className="space-y-3">
              {result.cv_specific.map((q, i) => (
                <QuestionCard key={i} q={q} index={i} category="cv" />
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default Interview