import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'

const DateOfBirth = ({ userProfile, updateProfile, nextStep }) => {
  const [dateOfBirth, setDateOfBirth] = useState(userProfile.dateOfBirth || '')

  const handleDateChange = (e) => {
    const date = e.target.value
    setDateOfBirth(date)
    updateProfile({ dateOfBirth: date })
  }

  const handleNext = () => {
    if (dateOfBirth) {
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

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="flo-title">What's your date of birth?</h1>
          <p className="text-gray-600 text-center mb-8 px-4">
            This helps us provide age-appropriate health insights and predictions.
          </p>
          
          <div className="mb-8">
            <input
              type="date"
              value={dateOfBirth}
              onChange={handleDateChange}
              className="w-full p-4 border-2 border-gray-200 rounded-2xl text-lg text-center focus:border-pink-500 focus:outline-none"
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="flo-next-button">
          <Button 
            onClick={handleNext}
            disabled={!dateOfBirth}
            className="flo-button w-full"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DateOfBirth

