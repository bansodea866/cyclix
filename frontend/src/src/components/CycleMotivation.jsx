import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const CycleMotivation = ({ userProfile, updateProfile, nextStep }) => {
  const [selectedMotivations, setSelectedMotivations] = useState(userProfile.motivations || [])

  const motivations = [
    {
      id: 'know-period-coming',
      title: 'To know when my period is coming',
      description: "Got it! We'll give you accurate period predictions so you're always prepared."
    },
    {
      id: 'cycle-symptoms-normal',
      title: 'To know if my cycle or symptoms are normal',
      description: "We'll help you analyze and manage your cycle and symptoms so you stay happy and healthy."
    },
    {
      id: 'improve-sex-life',
      title: 'To improve my sex life',
      description: "Want better orgasms, more intimacy and even new positions? Flo's sex experts have you covered."
    },
    {
      id: 'pregnancy-chances',
      title: 'To see how my chance of pregnancy changes through my cycle',
      description: "While Flo cannot be used as a method of contraception, we'll show you content to help you understand how your chances of pregnancy may change throughout your cycle."
    }
  ]

  const handleMotivationToggle = (motivationId) => {
    const newMotivations = selectedMotivations.includes(motivationId)
      ? selectedMotivations.filter(id => id !== motivationId)
      : [...selectedMotivations, motivationId]
    
    setSelectedMotivations(newMotivations)
    updateProfile({ motivations: newMotivations })
  }

  const handleNext = () => {
    nextStep()
  }

  return (
    <div className="flo-screen">
      <div className="flo-container">
        <div className="flo-header">
          <div></div>
          <button className="text-gray-400 text-sm">Skip</button>
        </div>

        <div className="flex-1">
          <h1 className="flo-title">Why are you tracking your cycle?</h1>
          <p className="flo-subtitle">Choose as many as you like.</p>
          
          <div className="space-y-4">
            {motivations.map((motivation) => (
              <button
                key={motivation.id}
                onClick={() => handleMotivationToggle(motivation.id)}
                className={`flo-card w-full text-left ${
                  selectedMotivations.includes(motivation.id) ? '' : 'flo-card-outline'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-lg">{motivation.title}</h3>
                  <div className={`flo-checkbox ml-4 ${
                    selectedMotivations.includes(motivation.id) ? 'checked' : ''
                  }`}>
                    {selectedMotivations.includes(motivation.id) && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                </div>
                <p className="text-sm opacity-90">{motivation.description}</p>
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

export default CycleMotivation

