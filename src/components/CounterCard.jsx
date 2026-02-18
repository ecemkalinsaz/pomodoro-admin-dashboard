import React from 'react'

function CounterCard({ title, count, icon, iconSize, onIncrement, onDecrement }) {
  return (
    <div className="card counter-card">
      {icon && (
        <div className="counter-icon-wrapper">
          <img
            src={icon}
            alt={title}
            className="counter-icon"
            style={iconSize ? { width: iconSize, height: iconSize } : undefined}
          />
        </div>
      )}

      <div className="counter-display">{count}</div>
      <p className="counter-label">{title}</p>

      <div className="counter-controls">
        <button className="btn btn-secondary" onClick={onDecrement}>−</button>
        <button className="btn btn-primary" onClick={onIncrement}>+</button>
      </div>
    </div>
  )
}

export default CounterCard
