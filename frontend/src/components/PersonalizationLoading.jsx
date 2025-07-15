import { useEffect, useState } from 'react'

const PersonalizationLoading = ({ userProfile, completeOnboarding }) => {
  const [progress, setProgress] = useState(0)
  const [currentText, setCurrentText] = useState('Find answers to your most intimate questions')

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 86) {
          clearInterval(progressInterval)
          setTimeout(() => {
            completeOnboarding()
          }, 1000)
          return 86
        }
        return prev + 2
      })
    }, 100)

    const textTimeout = setTimeout(() => {
      setCurrentText('Personalizing your experience...')
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearTimeout(textTimeout)
    }
  }, [completeOnboarding])

  return (
    <div className="flo-loading-screen">
      <div className="flo-loading-content">
        {/* Phone mockup */}
        <div className="w-64 h-96 bg-black rounded-3xl p-2 mb-8 mx-auto">
          <div className="w-full h-full bg-white rounded-2xl p-4 flex flex-col justify-center items-center">
            <div className="w-8 h-8 mb-4">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z" fill="#FF6B9D"/>
              </svg>
            </div>
            <div className="text-xs text-gray-600 mb-2">🔍 A</div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-6 px-8 text-center">
          {currentText}
        </h1>

        {/* Progress Circle */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#E5E7EB"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#FF6B9D"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              className="transition-all duration-300 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-gray-900">{progress}%</span>
          </div>
        </div>

        <p className="text-gray-600 text-center px-8">
          {progress < 50 ? 'Analyzing your preferences...' : 
           progress < 80 ? 'Creating your personalized experience...' : 
           'Almost ready...'}
        </p>
      </div>
    </div>
  )
}

export default PersonalizationLoading

