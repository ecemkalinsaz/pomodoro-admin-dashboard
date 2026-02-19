import React, { useState, useEffect } from 'react'
import pomodoroIcon from '../assets/pomodoro.png'

const PRESETS = {
  short: { focus: 1500, break: 300 },
  long: { focus: 3000, break: 600 }
}

function TimerCard({ selectedPreset, onPresetChange, onSessionChange }) {
  const [currentMode, setCurrentMode] = useState('focus')
  const [focusDuration, setFocusDuration] = useState(PRESETS.short.focus)
  const [breakDuration, setBreakDuration] = useState(PRESETS.short.break)
  const [remainingTime, setRemainingTime] = useState(PRESETS.short.focus)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    const newFocus = PRESETS[selectedPreset].focus
    const newBreak = PRESETS[selectedPreset].break
    setFocusDuration(newFocus)
    setBreakDuration(newBreak)
    setRemainingTime(newFocus)
    setCurrentMode('focus')
    setIsRunning(false)
  }, [selectedPreset])

  useEffect(() => {
    if (isRunning) {
      document.title = `${formatTime(remainingTime)} · ${currentMode === 'focus' ? 'Pomodoro' : 'Break'}`
    } else {
      document.title = 'Focus Dashboard'
    }
  }, [remainingTime, isRunning, currentMode])

  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      setRemainingTime(prev => {
        if (prev <= 1) {
          // Session ended, switch modes
          const newMode = currentMode === 'focus' ? 'break' : 'focus'
          setCurrentMode(newMode)
          onSessionChange(newMode)
          setIsRunning(false)
          return newMode === 'focus' ? focusDuration : breakDuration
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isRunning, currentMode, focusDuration, breakDuration, onSessionChange])

  const handleStartPause = () => {
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCurrentMode('focus')
    setRemainingTime(focusDuration)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="card timer-card">
      <h2 className="card-title">Focus Session</h2>

      <div className="timer-mode-label">
        {currentMode === 'focus' ? (
          <><img src={pomodoroIcon} alt="Pomodoro" className="card-title-icon" /> Pomodoro</>
        ) : '☕ Break'}
      </div>

      <div className="timer-circle-wrapper">
        <div className="timer-circle">
          <div className="timer-display">
            {formatTime(remainingTime)}
          </div>
        </div>
      </div>

      <div className="timer-presets">
        <button
          className={`preset-btn ${selectedPreset === 'short' ? 'active' : ''}`}
          onClick={() => onPresetChange('short')}
        >
          25/5
        </button>
        <button
          className={`preset-btn ${selectedPreset === 'long' ? 'active' : ''}`}
          onClick={() => onPresetChange('long')}
        >
          50/10
        </button>
      </div>

      <div className="timer-controls">
        <button
          className="btn btn-secondary btn-icon"
          onClick={handleStartPause}
          title={isRunning ? 'Pause' : 'Start'}
        >
          {isRunning ? '⏸' : '▶'}
        </button>
        <button
          className="btn btn-secondary btn-icon"
          onClick={handleReset}
          title="Reset"
        >
          ↻
        </button>
      </div>
    </div>
  )
}

export default TimerCard
