import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const SleepImprovement = ({ userProfile, updateProfile, nextStep }) => {
  const [selectedImprovements, setSelectedImprovements] = useState(userProfile.sleepImprovements || [])

  const improvements = [
    'Falling asleep faster',
    'Staying asleep through the night',
    'Waking up feeling more rested',
    'Improving sleep quality overall',
    'Creating a better bedtime routine',
    "I'm not looking to improve anything"
  ]

  const handleImprovementToggle = (improvement) => {
    const newImprovements = selectedImprovements.includes(improvement)
      ? selectedImprovements.filter(item => item !== improvement)
      : [...selectedImprovements, improvement]
    
    setSelectedImprovements(newImprovements)
    updateProfile({ sleepImprovements: newImprovements })
  }

  const handleNext = () => {
    nextStep()
  }

  return (
    <div className="flo-screen">
      <div className="flo-container">
        <div className="flo-header">
          <div className="flo-progress flex-1">
            <div className="flo-progress-fill" style={{ width: '100%' }}></div>
          </div>
          <button className="text-gray-400 text-sm ml-4">Skip</button>
        </div>

        <div className="flex-1">
          <h1 className="flo-title">What aspect of your sleep would you like to improve?</h1>
          
          <div className="space-y-4">
            {improvements.map((improvement, index) => (
              <button
                key={index}
                onClick={() => handleImprovementToggle(improvement)}
                className={`flo-option w-full flex items-center justify-between ${
                  selectedImprovements.includes(improvement) ? 'selected flo-pink text-white' : ''
                }`}
              >
                <span className="text-left">{improvement}</span>
                <div className={`flo-checkbox ${
                  selectedImprovements.includes(improvement) ? 'checked' : ''
                }`}>
                  {selectedImprovements.includes(improvement) && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flo-next-button">
          <Button 
            onClick={handleNext}
            className="flo-button w-full"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SleepImprovement

