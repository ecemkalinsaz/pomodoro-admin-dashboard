import React, { useState } from 'react'
import TaskItem from './TaskItem'

function TaskCard({ tasks, onAddTask, onToggleTask, onDeleteTask }) {
  const [inputValue, setInputValue] = useState('')

  const handleAddTask = () => {
    if (inputValue.trim()) {
      onAddTask(inputValue)
      setInputValue('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask()
    }
  }

  const completedCount = tasks.filter(t => t.completed).length

  return (
    <div className="card task-card">
      <h2 className="card-title">Tasks</h2>
      <p className="task-progress">
        {completedCount} of {tasks.length} completed
      </p>

      <div className="task-input-group">
        <input
          type="text"
          className="task-input"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          className="btn btn-primary btn-sm"
          onClick={handleAddTask}
        >
          +
        </button>
      </div>

      <div className="task-list">
        {tasks.length === 0 ? (
          <p className="task-empty">No tasks yet. Add one to get started!</p>
        ) : (
          tasks.map(task => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={() => onToggleTask(task.id)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default TaskCard
