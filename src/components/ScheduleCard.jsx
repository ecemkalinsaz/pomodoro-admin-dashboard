import React from 'react'

function ScheduleCard() {
  const scheduleItems = [
    { time: '09:00 AM', task: 'Deep Work Session', subtitle: 'Focus Block', color: '#48bb78' },
    { time: '11:30 AM', task: 'Team Standup', subtitle: 'Zoom Meeting', color: '#f6ad55' },
    { time: '02:00 PM', task: 'Design Review', subtitle: 'Figma', color: '#9f7aea' },
    { time: '04:30 PM', task: 'Code Review', subtitle: 'GitHub PR', color: '#63b3ed' },
  ]

  return (
    <div className="card schedule-card">
      <h2 className="card-title">📅 Schedule</h2>

      <div className="schedule-list">
        {scheduleItems.map((item, idx) => (
          <div key={idx} className="schedule-item">
            <div className="schedule-indicator" style={{ background: item.color }} />
            <span className="schedule-time">{item.time}</span>
            <div className="schedule-info">
              <span className="schedule-task">{item.task}</span>
              <span className="schedule-subtitle">{item.subtitle}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ScheduleCard
