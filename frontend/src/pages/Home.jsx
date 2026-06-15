import { Link } from 'react-router-dom'

function Home() {
  const features = [
    {
      icon: '🧠',
      title: 'AI CV Analysis',
      desc: 'Get instant feedback on your CV with strengths, skill gaps, and actionable recommendations powered by Gemini AI.'
    },
    {
      icon: '🎯',
      title: 'Job Matcher',
      desc: 'Upload a job description and see exactly how well your CV matches with a detailed score and missing skills.'
    },
    {
      icon: '✉️',
      title: 'Cover Letter Generator',
      desc: 'Automatically generate a personalized cover letter tailored to the job you are applying for.'
    },
    {
      icon: '🎤',
      title: 'Interview Prep',
      desc: 'Get personalized technical, behavioral and CV-specific interview questions with expert answer tips.'
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-6">

      {/* Hero Section */}
      <div className="text-center py-24">
        <div className="inline-block bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium px-4 py-2 rounded-full mb-6">
          ✨ Powered by Google Gemini AI
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Land Your Dream Job
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
            With AI Power
          </span>
        </h1>
        <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-10">
          Upload your CV and let AI analyze it, match it to jobs, and generate personalized cover letters in seconds.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            to="/analyze"
            className="bg-violet-600 hover:bg-violet-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-lg"
          >
            Analyze My CV →
          </Link>
          <Link
            to="/match"
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-lg border border-gray-700"
          >
            Match a Job
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="pb-24">
        <h2 className="text-3xl font-bold text-center text-white mb-12">
          Everything you need to get hired
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-violet-500/50 transition-all duration-200"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-white font-semibold text-xl mb-2">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default Home