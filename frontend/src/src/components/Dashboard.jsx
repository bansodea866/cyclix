import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Settings, Plus, Calendar, Heart, Moon, Activity } from 'lucide-react'

const Dashboard = ({ userProfile }) => {
  const [currentDate] = useState(new Date())
  
  // Calculate cycle predictions based on last period
  const calculatePredictions = () => {
    if (!userProfile.lastPeriodDate) return null
    
    const lastPeriod = new Date(userProfile.lastPeriodDate)
    const cycleLength = 28 // Default cycle length
    const nextPeriod = new Date(lastPeriod.getTime() + cycleLength * 24 * 60 * 60 * 1000)
    const ovulation = new Date(lastPeriod.getTime() + 14 * 24 * 60 * 60 * 1000)
    
    return { nextPeriod, ovulation }
  }

  const predictions = calculatePredictions()

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const getDaysUntil = (date) => {
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="flo-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="flo-container">
        {/* Header */}
        <div className="flo-header">
          <h1 className="text-2xl font-bold text-gray-900">Today</h1>
          <Link to="/settings">
            <Settings className="w-6 h-6 text-gray-600" />
          </Link>
        </div>

        {/* Wellbeing Battery */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-2">Today your Well-being Battery is</p>
            <h2 className="text-2xl font-bold text-gray-900">Half-full</h2>
          </div>
          
          {/* Battery Icon */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-24 border-3 border-gray-300 rounded-lg bg-white">
                <div className="w-full h-1/2 bg-yellow-400 rounded-b-md mt-auto"></div>
                {/* Battery face */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
                  <div className="flex space-x-1 mb-1">
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  </div>
                  <div className="w-2 h-0.5 bg-gray-600 rounded-full"></div>
                </div>
              </div>
              <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-4 h-1.5 bg-gray-300 rounded-t"></div>
            </div>
          </div>

          {/* Impact Factors */}
          <div className="text-center mb-4">
            <p className="font-semibold text-gray-900 mb-4">What's having an impact</p>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 p-3 rounded-xl">
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 text-green-500 mr-2" />
                  <span className="font-medium">Cycle</span>
                </div>
                <p className="text-green-600 font-medium">Fertile days</p>
                <p className="text-gray-600 text-xs">You might feel active and energized today.</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-xl">
                <div className="flex items-center mb-2">
                  <Heart className="w-4 h-4 text-orange-500 mr-2" />
                  <span className="font-medium">Symptoms</span>
                </div>
                <p className="text-orange-600 font-medium">You got this</p>
                <p className="text-gray-600 text-xs">Today might be a steady and balanced day.</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-xl">
                <div className="flex items-center mb-2">
                  <Moon className="w-4 h-4 text-blue-500 mr-2" />
                  <span className="font-medium">Sleep</span>
                </div>
                <p className="text-blue-600 font-medium">Good rest</p>
                <p className="text-gray-600 text-xs">Your sleep patterns look healthy.</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-xl">
                <div className="flex items-center mb-2">
                  <Activity className="w-4 h-4 text-purple-500 mr-2" />
                  <span className="font-medium">Activity</span>
                </div>
                <p className="text-purple-600 font-medium">Stay active</p>
                <p className="text-gray-600 text-xs">Keep up your movement routine.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cycle Predictions */}
        {predictions && (
          <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your cycle</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-pink-50 rounded-2xl">
                <div>
                  <p className="font-medium text-pink-700">Next period</p>
                  <p className="text-sm text-pink-600">
                    {formatDate(predictions.nextPeriod)} • {getDaysUntil(predictions.nextPeriod)} days
                  </p>
                </div>
                <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-2xl">
                <div>
                  <p className="font-medium text-green-700">Ovulation</p>
                  <p className="text-sm text-green-600">
                    {formatDate(predictions.ovulation)} • {getDaysUntil(predictions.ovulation)} days
                  </p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-white rounded-3xl p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Log today</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center p-4 bg-pink-50 rounded-2xl hover:bg-pink-100 transition-colors">
              <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-2">
                <Plus className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Period</span>
            </button>
            
            <button className="flex flex-col items-center p-4 bg-blue-50 rounded-2xl hover:bg-blue-100 transition-colors">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Symptoms</span>
            </button>
            
            <button className="flex flex-col items-center p-4 bg-purple-50 rounded-2xl hover:bg-purple-100 transition-colors">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-2">
                <Moon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Sleep</span>
            </button>
            
            <button className="flex flex-col items-center p-4 bg-green-50 rounded-2xl hover:bg-green-100 transition-colors">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-2">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-700">Activity</span>
            </button>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">For you</h3>
          
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl">
              <h4 className="font-medium text-gray-900 mb-2">Cycle insights</h4>
              <p className="text-sm text-gray-600">
                Your cycle is looking regular. Keep tracking to get more personalized insights.
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl">
              <h4 className="font-medium text-gray-900 mb-2">Health tip</h4>
              <p className="text-sm text-gray-600">
                Stay hydrated during your cycle. Drinking enough water can help reduce bloating.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

