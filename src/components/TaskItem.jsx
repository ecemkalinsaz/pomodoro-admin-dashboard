import React from 'react'

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="task-item">
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.completed}
        onChange={onToggle}
      />
      <span className={`task-text ${task.completed ? 'completed' : ''}`}>
        {task.text}
      </span>
      <button
        className="task-delete"
        onClick={onDelete}
        aria-label="Delete task"
      >
        ✕
      </button>
    </div>
  )
}

export default TaskItem
