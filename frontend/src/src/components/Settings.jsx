import { Link } from 'react-router-dom'
import { 
  X, 
  FileText, 
  EyeOff, 
  Lock, 
  BarChart3, 
  RefreshCw, 
  Settings as SettingsIcon,
  Shield,
  Bell,
  HelpCircle,
  Info,
  ChevronRight
} from 'lucide-react'

const Settings = ({ userProfile, updateProfile }) => {
  const handleGoalChange = (newGoal) => {
    updateProfile({ goal: newGoal })
  }

  const settingsItems = [
    {
      icon: FileText,
      label: 'Report for a doctor',
      hasArrow: true
    },
    {
      icon: EyeOff,
      label: 'Hide content',
      hasArrow: true
    },
    {
      icon: Lock,
      label: 'App lock',
      hasArrow: true
    },
    {
      icon: BarChart3,
      label: 'Graphs & reports',
      hasArrow: true
    },
    {
      icon: RefreshCw,
      label: 'Cycle and ovulation',
      hasArrow: true
    },
    {
      icon: SettingsIcon,
      label: 'App settings',
      hasArrow: true
    },
    {
      icon: Shield,
      label: 'Privacy settings',
      hasArrow: true
    },
    {
      icon: Bell,
      label: 'Reminders',
      hasArrow: true
    },
    {
      icon: HelpCircle,
      label: 'Help',
      hasArrow: true
    },
    {
      icon: Info,
      label: 'About Flo',
      hasArrow: true
    }
  ]

  return (
    <div className="flo-screen bg-gray-50">
      <div className="flo-container">
        {/* Header */}
        <div className="flo-header">
          <Link to="/">
            <X className="w-6 h-6 text-gray-600" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">Settings</h1>
          <div></div>
        </div>

        {/* Goal Selection */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">My goal:</h2>
          
          <div className="flex space-x-3">
            <button
              onClick={() => handleGoalChange('track-cycle')}
              className={`flo-goal-pill ${
                userProfile.goal === 'track-cycle' ? 'active' : 'inactive'
              }`}
            >
              Track cycle
            </button>
            <button
              onClick={() => handleGoalChange('get-pregnant')}
              className={`flo-goal-pill ${
                userProfile.goal === 'get-pregnant' ? 'active' : 'inactive'
              }`}
            >
              Get pregnant
            </button>
            <button
              onClick={() => handleGoalChange('track-pregnancy')}
              className={`flo-goal-pill ${
                userProfile.goal === 'track-pregnancy' ? 'active' : 'inactive'
              }`}
            >
              Track pregnancy
            </button>
          </div>
        </div>

        {/* Settings List */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {settingsItems.map((item, index) => (
            <button
              key={index}
              className="flo-settings-item w-full text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <item.icon className="flo-settings-icon text-gray-600" />
                <span className="text-gray-900 font-medium">{item.label}</span>
              </div>
              {item.hasArrow && (
                <ChevronRight className="w-5 h-5 text-gray-400" />
              )}
            </button>
          ))}
        </div>

        {/* User Profile Summary */}
        <div className="bg-white rounded-2xl p-6 mt-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Summary</h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Goal:</span>
              <span className="text-gray-900 font-medium capitalize">
                {userProfile.goal?.replace('-', ' ') || 'Not set'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Date of Birth:</span>
              <span className="text-gray-900 font-medium">
                {userProfile.dateOfBirth || 'Not set'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Last Period:</span>
              <span className="text-gray-900 font-medium">
                {userProfile.lastPeriodDate 
                  ? new Date(userProfile.lastPeriodDate).toLocaleDateString()
                  : 'Not set'
                }
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Sleep Hours:</span>
              <span className="text-gray-900 font-medium">
                {userProfile.sleepHours || 'Not set'}
              </span>
            </div>
            
            {userProfile.motivations && userProfile.motivations.length > 0 && (
              <div>
                <span className="text-gray-600">Tracking Motivations:</span>
                <div className="mt-1">
                  {userProfile.motivations.map((motivation, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full mr-2 mb-1"
                    >
                      {motivation.replace('-', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings

