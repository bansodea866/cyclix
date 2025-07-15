import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

const SleepHours = ({ userProfile, updateProfile, nextStep }) => {
  const [selectedHours, setSelectedHours] = useState(userProfile.sleepHours || '')

  const sleepOptions = [
    'Less than 5 hours',
    '5-6 hours',
    '7-8 hours',
    'More than 8 hours'
  ]

  const handleHoursSelect = (hours) => {
    setSelectedHours(hours)
    updateProfile({ sleepHours: hours })
  }

  const handleNext = () => {
    if (selectedHours) {
      nextStep()
    }
  }

  return (
    <div className="flo-screen">
      <div className="flo-container">
        <div className="flo-header">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
          <div className="flo-progress flex-1 mx-4">
            <div className="flo-progress-fill" style={{ width: '100%' }}></div>
          </div>
          <button className="text-gray-400 text-sm">Skip</button>
        </div>

        <div className="flex-1">
          <h1 className="flo-title">How many hours of sleep do you usually get?</h1>
          <p className="text-gray-600 text-center mb-8 px-4">
            Experts recommend around 7 to 9 hours of sleep a night to feel your best.
          </p>
          
          <div className="space-y-4">
            {sleepOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleHoursSelect(option)}
                className={`flo-option w-full ${
                  selectedHours === option ? 'selected' : ''
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flo-next-button">
          <Button 
            onClick={handleNext}
            disabled={!selectedHours}
            className="flo-button w-full"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SleepHours

