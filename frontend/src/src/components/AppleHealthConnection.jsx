import { Button } from '@/components/ui/button'

const AppleHealthConnection = ({ userProfile, updateProfile, nextStep }) => {
  const handleNext = () => {
    nextStep()
  }

  return (
    <div className="flo-screen bg-gradient-to-b from-pink-100 to-pink-50">
      <div className="flo-container">
        <div className="flex-1 flex flex-col justify-center items-center text-center">
          {/* Battery Character */}
          <div className="mb-8">
            <div className="relative">
              <div className="w-24 h-40 border-4 border-gray-300 rounded-xl bg-white mx-auto">
                <div className="w-full h-1/3 bg-orange-400 rounded-b-lg mt-auto"></div>
                {/* Battery face */}
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-2 mb-2">
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                  </div>
                  <div className="w-4 h-1 bg-gray-600 rounded-full"></div>
                </div>
              </div>
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-8 h-3 bg-gray-300 rounded-t-lg"></div>
              
              {/* Battery legs */}
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                <div className="w-2 h-4 bg-blue-400 rounded-full"></div>
                <div className="w-2 h-4 bg-blue-400 rounded-full"></div>
              </div>
            </div>
            
            {/* Clouds */}
            <div className="absolute top-20 left-10 w-16 h-8 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-32 right-12 w-12 h-6 bg-white rounded-full opacity-60"></div>
            <div className="absolute top-40 left-20 w-20 h-10 bg-white rounded-full opacity-70"></div>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Connecting to Apple Health will keep your battery updated
          </h1>
          
          <p className="text-gray-600 mb-8 px-6">
            Your tracked steps could influence your daily charge levels in the future.
          </p>
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

export default AppleHealthConnection

