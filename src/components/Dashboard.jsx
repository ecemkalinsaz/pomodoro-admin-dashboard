import React, { useState, useEffect } from 'react'
import TimerCard from './TimerCard'
import TaskCard from './TaskCard'
import MusicCard from './MusicCard'
import CounterCard from './CounterCard'
import QuoteCard from './QuoteCard'
import ScheduleCard from './ScheduleCard'
import coffeeIcon from '../assets/coffee.png'
import waterIcon from '../assets/water.png'

function Dashboard() {
  const [selectedPreset, setSelectedPreset] = useState('short')
  const [tasks, setTasks] = useState([])
  const [coffeeCount, setCoffeeCount] = useState(0)
  const [waterCount, setWaterCount] = useState(0)
  const [lastSession, setLastSession] = useState(null)
  const [userName] = useState('Ecem')

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const getDayName = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return days[new Date().getDay()]
  }

  const getFormattedDate = () => {
    const today = new Date()
    const month = today.toLocaleString('en-US', { month: 'long' })
    const date = today.getDate()
    return `${month} ${date}`
  }

  const handleAddTask = (taskText) => {
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false
    }
    setTasks([...tasks, newTask])
  }

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const handlePresetChange = (preset) => {
    setSelectedPreset(preset)
  }

  const handleSessionChange = (mode) => {
    setLastSession(mode)
  }

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div className="header-top">
          <div className="greeting-section">
            <h1 className="greeting-title">
              {getGreeting()}, <span className="user-name">{userName}</span>
            </h1>
            <p className="greeting-subtitle">
              {getDayName()}, {getFormattedDate()} • <span className="focus-status">Focus Mode Active</span>
            </p>
          </div>
        </div>
      </header>

      <main className="dashboard-grid">
        {/* Left Column - Focus + Stats */}
        <div className="focus">
          <TimerCard
            selectedPreset={selectedPreset}
            onPresetChange={handlePresetChange}
            onSessionChange={handleSessionChange}
          />
          <div className="stats-inner">
            <CounterCard
              title="Coffee"
              count={coffeeCount}
              icon={coffeeIcon}
              iconSize="3.75rem"
              onIncrement={() => setCoffeeCount(coffeeCount + 1)}
              onDecrement={() => setCoffeeCount(Math.max(0, coffeeCount - 1))}
            />
            <CounterCard
              title="Glass"
              count={waterCount}
              icon={waterIcon}
              onIncrement={() => setWaterCount(waterCount + 1)}
              onDecrement={() => setWaterCount(Math.max(0, waterCount - 1))}
            />
          </div>
        </div>

        {/* Center Column - Tasks */}
        <div className="tasks">
          <TaskCard
            tasks={tasks}
            onAddTask={handleAddTask}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        </div>

        {/* Right Column - Music/Quote/Schedule */}
        <div className="right">
          <div className="right-inner">
            <MusicCard />
            <QuoteCard />
            <ScheduleCard />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
