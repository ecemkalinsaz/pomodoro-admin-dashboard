import React, { useState, useEffect } from 'react'
import calendarIcon from '../assets/calendar.png'

const COLORS = ['#48bb78', '#f6ad55', '#9f7aea', '#63b3ed', '#fc8181', '#68d391']

const DEFAULT_ITEMS = [
  { id: 1, time: '09:00', task: 'Deep Work Session', subtitle: 'Focus Block', color: '#48bb78' },
  { id: 2, time: '11:30', task: 'Team Standup', subtitle: 'Zoom Meeting', color: '#f6ad55' },
  { id: 3, time: '14:00', task: 'Design Review', subtitle: 'Figma', color: '#9f7aea' },
  { id: 4, time: '16:30', task: 'Code Review', subtitle: 'GitHub PR', color: '#63b3ed' },
]

function formatTime(time) {
  const [h, m] = time.split(':')
  const hour = parseInt(h)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const display = hour % 12 || 12
  return `${display}:${m} ${ampm}`
}

function ScheduleCard() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('schedule')
    return saved ? JSON.parse(saved) : DEFAULT_ITEMS
  })
  const [newTime, setNewTime] = useState('')
  const [newTask, setNewTask] = useState('')
  const [newSubtitle, setNewSubtitle] = useState('')

  useEffect(() => {
    localStorage.setItem('schedule', JSON.stringify(items))
  }, [items])

  const handleAdd = () => {
    if (!newTime || !newTask.trim()) return
    const color = COLORS[items.length % COLORS.length]
    setItems([...items, {
      id: Date.now(),
      time: newTime,
      task: newTask.trim(),
      subtitle: newSubtitle.trim(),
      color
    }])
    setNewTime('')
    setNewTask('')
    setNewSubtitle('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleAdd()
  }

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id))
  }

  const sortedItems = [...items].sort((a, b) => a.time.localeCompare(b.time))

  return (
    <div className="card schedule-card">
      <h2 className="card-title">
        <img src={calendarIcon} alt="Schedule" className="card-title-icon" />
        Schedule
      </h2>

      <div className="schedule-form">
        <div className="schedule-input-row">
          <input
            type="time"
            className="schedule-input schedule-input-time"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <input
            type="text"
            className="schedule-input"
            placeholder="Title"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="btn btn-primary btn-sm" onClick={handleAdd}>+</button>
        </div>
        <input
          type="text"
          className="schedule-input schedule-input-subtitle"
          placeholder="Details (optional)"
          value={newSubtitle}
          onChange={(e) => setNewSubtitle(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="schedule-list">
        {sortedItems.length === 0 && (
          <p className="task-empty">No events yet. Add one above.</p>
        )}
        {sortedItems.map((item) => (
          <div key={item.id} className="schedule-item">
            <div className="schedule-indicator" style={{ background: item.color }} />
            <span className="schedule-time">{formatTime(item.time)}</span>
            <div className="schedule-info">
              <span className="schedule-task">{item.task}</span>
              {item.subtitle && (
                <span className="schedule-subtitle">{item.subtitle}</span>
              )}
            </div>
            <button className="task-delete" onClick={() => handleDelete(item.id)}>×</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScheduleCard
