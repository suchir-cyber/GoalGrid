import React from 'react';
import './taskCard.css'; // Import the CSS file for styling

function TaskCard({ task }) {
    const priorityClass = task.priority === 'high' ? 'priority-high' : 
                          task.priority === 'medium' ? 'priority-medium' : 
                          'priority-low';
    console.log(priorityClass)
    return (
        <div className="task-card">
            {/* Priority Dot */}
            <div className={`priority-dot ${priorityClass}`} />
            
            {/* Task Details */}
            <h3>{task.title}</h3>
            <p className="description">{task.description}</p>
            <p className="due-date">Due Date: {task.dueDate}</p>
            <p className="priority">Priority: {task.priority}</p>
        </div>
    );
}

export default TaskCard;
