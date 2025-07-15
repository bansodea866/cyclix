import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

// Import components
import GoalSelection from './components/GoalSelection'
import CycleMotivation from './components/CycleMotivation'
import SexLifeEnhancement from './components/SexLifeEnhancement'
import CycleSexConnection from './components/CycleSexConnection'
import WellbeingBattery from './components/WellbeingBattery'
import AppleHealthConnection from './components/AppleHealthConnection'
import SleepImprovement from './components/SleepImprovement'
import SleepHours from './components/SleepHours'
import PersonalizationLoading from './components/PersonalizationLoading'
import DateOfBirth from './components/DateOfBirth'
import LastPeriodDate from './components/LastPeriodDate'
import Dashboard from './components/Dashboard'
import Settings from './components/Settings'

function App() {
  const [userProfile, setUserProfile] = useState({
    user_id: 'test_user_id', // Placeholder for now, will be dynamic with auth
    goal: '',
    motivations: [],
    sexLifeEnhancements: [],
    cycleSexConnection: '',
    sleepImprovements: [],
    sleepHours: '',
    dateOfBirth: '',
    lastPeriodDate: null,
    periodDates: []
  })

  const [currentStep, setCurrentStep] = useState(0)
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false)

  // Load user profile from backend on initial load
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/profile/test_user_id')
        if (response.ok) {
          const data = await response.json()
          setUserProfile(prev => ({ ...prev, ...data.profile }))
        } else if (response.status === 404) {
          console.log('No existing profile found, starting fresh.')
        } else {
          console.error('Failed to fetch user profile:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }
    fetchUserProfile()
  }, [])

  const updateProfile = async (updates) => {
    const updatedProfile = { ...userProfile, ...updates }
    setUserProfile(updatedProfile)

    try {
      const response = await fetch('http://localhost:5001/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      })
      if (!response.ok) {
        console.error('Failed to save user profile:', response.statusText)
      }
    } catch (error) {
      console.error('Error saving user profile:', error)
    }
  }

  const nextStep = () => {
    setCurrentStep(prev => prev + 1)
  }

  const completeOnboarding = () => {
    setIsOnboardingComplete(true)
  }

  if (isOnboardingComplete) {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard userProfile={userProfile} />} />
          <Route path="/settings" element={<Settings userProfile={userProfile} updateProfile={updateProfile} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    )
  }

  const onboardingSteps = [
    <GoalSelection 
      key="goal" 
      userProfile={userProfile} 
      updateProfile={updateProfile} 
      nextStep={nextStep} 
    />,
    <CycleMotivation 
      key="motivation" 
      userProfile={userProfile} 
      updateProfile={updateProfile} 
      nextStep={nextStep} 
    />,
    ...(userProfile.motivations.includes('improve-sex-life') ? [
      <SexLifeEnhancement 
        key="sex-life" 
        userProfile={userProfile} 
        updateProfile={updateProfile} 
        nextStep={nextStep} 
      />,
      <CycleSexConnection 
        key="cycle-sex" 
        userProfile={userProfile} 
        updateProfile={updateProfile} 
        nextStep={nextStep} 
      />
    ] : []),
    <WellbeingBattery 
      key="wellbeing" 
      userProfile={userProfile} 
      updateProfile={updateProfile} 
      nextStep={nextStep} 
    />,
    <AppleHealthConnection 
      key="apple-health" 
      userProfile={userProfile} 
      updateProfile={updateProfile} 
      nextStep={nextStep} 
    />,
    <SleepImprovement 
      key="sleep-improvement" 
      userProfile={userProfile} 
      updateProfile={updateProfile} 
      nextStep={nextStep} 
    />,
    <SleepHours 
      key="sleep-hours" 
      userProfile={userProfile} 
      updateProfile={updateProfile} 
      nextStep={nextStep} 
    />,
    <DateOfBirth 
      key="dob" 
      userProfile={userProfile} 
      updateProfile={updateProfile} 
      nextStep={nextStep} 
    />,
    <LastPeriodDate 
      key="period-date" 
      userProfile={userProfile} 
      updateProfile={updateProfile} 
      nextStep={nextStep} 
    />,
    <PersonalizationLoading 
      key="loading" 
      userProfile={userProfile} 
      completeOnboarding={completeOnboarding} 
    />
  ]

  return (
    <div className="flo-screen">
      {onboardingSteps[currentStep] || onboardingSteps[0]}
    </div>
  )
}

export default App


