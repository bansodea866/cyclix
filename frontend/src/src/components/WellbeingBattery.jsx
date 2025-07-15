import { Button } from '@/components/ui/button'
import { ChevronLeft, Check } from 'lucide-react'

const WellbeingBattery = ({ userProfile, updateProfile, nextStep }) => {
  const handleNext = () => {
    nextStep()
  }

  return (
    <div className="flo-screen">
      <div className="flo-container">
        <div className="flo-header">
          <ChevronLeft className="w-6 h-6 text-gray-600" />
          <div></div>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          {/* Wellbeing Battery Preview */}
          <div className="flo-wellbeing-battery mb-8">
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600">9:41</p>
                <p className="text-sm text-gray-600 mb-2">Today your Well-being Battery is</p>
                <h2 className="text-2xl font-bold text-gray-900">Half-full</h2>
              </div>
              
              {/* Battery Icon */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-20 h-32 border-4 border-gray-300 rounded-lg bg-white">
                    <div className="w-full h-1/2 bg-yellow-400 rounded-b-md mt-auto"></div>
                  </div>
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-gray-300 rounded-t"></div>
                </div>
              </div>

              {/* Impact Factors */}
              <div className="text-center mb-4">
                <p className="font-semibold text-gray-900 mb-4">What's having an impact</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <div className="flex items-center mb-2">
                      <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                      <span className="font-medium">Cycle</span>
                    </div>
                    <p className="text-green-600 font-medium">Fertile days</p>
                    <p className="text-gray-600 text-xs">You might feel active and energized today.</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <div className="flex items-center mb-2">
                      <div className="w-4 h-4 rounded-full bg-orange-500 mr-2"></div>
                      <span className="font-medium">Symptoms</span>
                    </div>
                    <p className="text-orange-600 font-medium">You got this</p>
                    <p className="text-gray-600 text-xs">Today might be a steady and balanced day.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="flo-title">Introducing your wellbeing battery</h1>
          <p className="text-gray-600 text-center mb-8 px-4">
            We're exploring ways to visualize how you might feel on any day. Your battery's level of charge will change based on the data you log in Flo. Find out more about how it will work.
          </p>

          <div className="space-y-3 mb-8">
            <div className="flex items-start">
              <Check className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">Know what to look for and get support for reproductive health conditions</p>
            </div>
            <div className="flex items-start">
              <Check className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">Get support for your feelings and stop your symptoms in their tracks</p>
            </div>
            <div className="flex items-start">
              <Check className="w-5 h-5 text-pink-500 mr-3 mt-0.5 flex-shrink-0" />
              <p className="text-gray-700">Learn life changing masturbation techniques</p>
            </div>
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

export default WellbeingBattery

