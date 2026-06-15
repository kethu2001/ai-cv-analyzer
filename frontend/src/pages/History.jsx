import { useState, useEffect } from 'react'
import axios from 'axios'

function History() {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/cv/history')
      setHistory(res.data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/cv/history/${id}`)
      setHistory(history.filter(h => h._id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  const typeConfig = {
    cv_analysis: { label: 'CV Analysis', color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20', icon: '🧠' },
    job_match: { label: 'Job Match', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/20', icon: '🎯' },
    interview_prep: { label: 'Interview Prep', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', icon: '🎤' }
  }

  const renderPreview = (item) => {
    if (item.type === 'cv_analysis') {
      return (
        <p className="text-gray-400 text-sm mt-2 line-clamp-2">
          {item.result?.summary}
        </p>
      )
    }
    if (item.type === 'job_match') {
      return (
        <p className="text-gray-400 text-sm mt-2">
          Match Score: <span className="text-green-400 font-bold">{item.result?.match_score}%</span>
        </p>
      )
    }
    if (item.type === 'interview_prep') {
      return (
        <p className="text-gray-400 text-sm mt-2">
          {item.result?.technical?.length} technical • {item.result?.behavioral?.length} behavioral • {item.result?.cv_specific?.length} CV-specific questions
        </p>
      )
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-white mb-2">History</h1>
      <p className="text-gray-400 mb-10">Your recent AI analysis results</p>

      {loading && (
        <div className="text-center py-20 text-gray-500">Loading history...</div>
      )}

      {!loading && history.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">📭</div>
          <p className="text-gray-500 text-lg">No history yet!</p>
          <p className="text-gray-600 mt-2">Start by analyzing a CV or matching a job</p>
        </div>
      )}

      <div className="space-y-4">
        {history.map((item) => {
          const config = typeConfig[item.type]
          return (
            <div
              key={item._id}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  {/* Type Badge */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${config.bg} ${config.color}`}>
                      {config.icon} {config.label}
                    </span>
                    <span className="text-gray-600 text-xs">{item.created_at}</span>
                  </div>

                  {/* Filename */}
                  <p className="text-white font-medium">📄 {item.cv_filename}</p>

                  {/* Preview */}
                  {renderPreview(item)}

                  {/* Job description preview for match/interview */}
                  {item.job_description && (
                    <p className="text-gray-600 text-xs mt-2 italic">
                      Job: {item.job_description}...
                    </p>
                  )}
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-gray-600 hover:text-red-400 transition-all duration-200 ml-4 text-xl"
                >
                  🗑️
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default History