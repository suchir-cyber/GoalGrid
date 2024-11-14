import React from 'react';
import './taskCard.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom'

function TaskCard({ task, deleteTask }) {
    const navigate = useNavigate();
    const priorityClass = task.priority === 'high' ? 'priority-high' : 
                          task.priority === 'medium' ? 'priority-medium' : 
                          'priority-low';
    
    const handleUpdateClick = () => {
        navigate(`/update-task/${task.id}`);
    };

    const handleDeleteClick = () => {
        deleteTask(task.id);
    };

    return (
        <div className="task-card">
            {/* Priority Dot */}
            <div className={`priority-dot ${priorityClass}`} />
            
            {/* Task Details */}
            <h3>{task.title}</h3>
            <p className="description">{task.description}</p>
            <p className="due-date-time">
                <span className="due-date-label">Due Date:</span> {task.dueDate} 
                <span className="due-time">at {task.dueTime}</span>
            </p>
            <p className="priority">Priority: {task.priority}</p>
            
            {/* Update and Delete Buttons */}
            <div className="task-actions">
                <button onClick={handleUpdateClick} className="update-button">Update</button>
                <button onClick={handleDeleteClick} className="delete-button">Delete</button>
            </div>
        </div>
    );
}

export default TaskCard;
