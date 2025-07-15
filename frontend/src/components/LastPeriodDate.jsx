import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const LastPeriodDate = ({ userProfile, updateProfile, nextStep }) => {
  const [selectedDate, setSelectedDate] = useState(userProfile.lastPeriodDate || null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const handleDateSelect = (date) => {
    if (!date) return
    
    setSelectedDate(date)
    
    // Auto-select 5 consecutive days starting from selected date
    const periodDates = []
    for (let i = 0; i < 5; i++) {
      const periodDate = new Date(date)
      periodDate.setDate(date.getDate() + i)
      periodDates.push(periodDate)
    }
    
    updateProfile({ 
      lastPeriodDate: date,
      periodDates: periodDates
    })
  }

  const isPeriodDate = (date) => {
    if (!selectedDate || !date) return false
    const periodDates = userProfile.periodDates || []
    return periodDates.some(periodDate => 
      periodDate.toDateString() === date.toDateString()
    )
  }

  const isToday = (date) => {
    if (!date) return false
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth)
    newMonth.setMonth(currentMonth.getMonth() + direction)
    setCurrentMonth(newMonth)
  }

  const handleNext = () => {
    if (selectedDate) {
      nextStep()
    }
  }

  const days = getDaysInMonth(currentMonth)

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
          <h1 className="flo-title">When did your last period start?</h1>
          <p className="text-gray-600 text-center mb-8 px-4">
            Select the first day of your most recent period. We'll automatically select 5 days.
          </p>
          
          <div className="flo-calendar">
            {/* Calendar Header */}
            <div className="flo-calendar-header">
              <button 
                onClick={() => navigateMonth(-1)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-semibold">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h2>
              <button 
                onClick={() => navigateMonth(1)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Day Names */}
            <div className="flo-calendar-grid mb-2">
              {dayNames.map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="flo-calendar-grid">
              {days.map((date, index) => (
                <button
                  key={index}
                  onClick={() => handleDateSelect(date)}
                  disabled={!date}
                  className={`flo-calendar-day ${
                    !date ? '' :
                    isPeriodDate(date) ? 'period' :
                    isToday(date) ? 'today' :
                    'selectable'
                  }`}
                >
                  {date ? date.getDate() : ''}
                </button>
              ))}
            </div>
          </div>

          {selectedDate && (
            <div className="mt-6 p-4 bg-pink-50 rounded-2xl">
              <p className="text-center text-pink-700">
                Period selected: {selectedDate.toLocaleDateString()} - {
                  new Date(selectedDate.getTime() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString()
                }
              </p>
            </div>
          )}
        </div>

        <div className="flo-next-button">
          <Button 
            onClick={handleNext}
            disabled={!selectedDate}
            className="flo-button w-full"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LastPeriodDate

