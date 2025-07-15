import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, ChevronLeft } from 'lucide-react'

const SexLifeEnhancement = ({ userProfile, updateProfile, nextStep }) => {
  const [selectedEnhancements, setSelectedEnhancements] = useState(userProfile.sexLifeEnhancements || [])

  const enhancements = [
    'I want to feel more connected during sex',
    'I want to have more orgasms',
    'I want to make sex more fun',
    'I want to feel more confident sexually',
    'Prefer not to answer'
  ]

  const handleEnhancementToggle = (enhancement) => {
    const newEnhancements = selectedEnhancements.includes(enhancement)
      ? selectedEnhancements.filter(item => item !== enhancement)
      : [...selectedEnhancements, enhancement]
    
    setSelectedEnhancements(newEnhancements)
    updateProfile({ sexLifeEnhancements: newEnhancements })
  }

  const handleNext = () => {
    nextStep()
  }

  return (
    <div className="flo-screen">
      <div className="flo-container">
        <div className="flo-header">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
          <div className="flo-progress flex-1 mx-4">
            <div className="flo-progress-fill" style={{ width: '75%' }}></div>
          </div>
          <button className="text-gray-400 text-sm">Skip</button>
        </div>

        <div className="flex-1">
          <p className="text-gray-600 text-center mb-6">
            1 in 4 say Flo helped them feel more satisfied with their sex life.
          </p>
          
          <h1 className="flo-title">How would you like to enhance your sex life?</h1>
          
          <div className="space-y-4">
            {enhancements.map((enhancement, index) => (
              <button
                key={index}
                onClick={() => handleEnhancementToggle(enhancement)}
                className={`flo-option w-full flex items-center justify-between ${
                  selectedEnhancements.includes(enhancement) ? 'selected flo-pink text-white' : ''
                }`}
              >
                <span className="text-left">{enhancement}</span>
                <div className={`flo-checkbox ${
                  selectedEnhancements.includes(enhancement) ? 'checked' : ''
                }`}>
                  {selectedEnhancements.includes(enhancement) && (
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

export default SexLifeEnhancement

