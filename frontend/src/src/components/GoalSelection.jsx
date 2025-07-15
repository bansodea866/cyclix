import { useState } from 'react'
import { Button } from '@/components/ui/button'

const GoalSelection = ({ userProfile, updateProfile, nextStep }) => {
  const [selectedGoal, setSelectedGoal] = useState(userProfile.goal || '')

  const goals = [
    { id: 'track-cycle', label: 'Track cycle' },
    { id: 'get-pregnant', label: 'Get pregnant' },
    { id: 'track-pregnancy', label: 'Track pregnancy' }
  ]

  const handleGoalSelect = (goalId) => {
    setSelectedGoal(goalId)
    updateProfile({ goal: goalId })
  }

  const handleNext = () => {
    if (selectedGoal) {
      nextStep()
    }
  }

  return (
    <div className="flo-screen">
      <div className="flo-container">
        <div className="flo-header">
          <div></div>
          <button className="text-gray-400 text-sm">Skip</button>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <h1 className="flo-title">My goal:</h1>
          
          <div className="space-y-4 mb-8">
            {goals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => handleGoalSelect(goal.id)}
                className={`flo-goal-pill w-full ${
                  selectedGoal === goal.id ? 'active' : 'inactive'
                }`}
              >
                {goal.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flo-next-button">
          <Button 
            onClick={handleNext}
            disabled={!selectedGoal}
            className="flo-button w-full"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default GoalSelection

