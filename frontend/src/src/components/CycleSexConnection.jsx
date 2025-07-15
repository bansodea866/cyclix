import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

const CycleSexConnection = ({ userProfile, updateProfile, nextStep }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(userProfile.cycleSexConnection || '')

  const answers = ['Yes', 'No', "I don't know"]

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer)
    updateProfile({ cycleSexConnection: answer })
  }

  const handleNext = () => {
    if (selectedAnswer) {
      nextStep()
    }
  }

  return (
    <div className="flo-screen">
      <div className="flo-container">
        <div className="flo-header">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
          <div className="flo-progress flex-1 mx-4">
            <div className="flo-progress-fill" style={{ width: '85%' }}></div>
          </div>
          <button className="text-gray-400 text-sm">Skip</button>
        </div>

        <div className="flex-1">
          <p className="text-gray-600 text-center mb-6">
            62% say Flo helps them understand the link between their cycle and their desire for sex.
          </p>
          
          <h1 className="flo-title">Do you know how your cycle relates to your sex life?</h1>
          
          <div className="space-y-4 mt-8">
            {answers.map((answer) => (
              <button
                key={answer}
                onClick={() => handleAnswerSelect(answer)}
                className={`flo-option w-full ${
                  selectedAnswer === answer ? 'selected' : ''
                }`}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>

        <div className="flo-next-button">
          <Button 
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="flo-button w-full"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CycleSexConnection

