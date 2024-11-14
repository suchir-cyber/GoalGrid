// import React from 'react';
// import './taskCard.css'; // Import the CSS file for styling
// import { useNavigate } from 'react-router-dom'

// function TaskCard({ task, deleteTask, markAsCompleted }) {
//     const navigate = useNavigate();
//     const priorityClass = task.priority === 'high' ? 'priority-high' : 
//                           task.priority === 'medium' ? 'priority-medium' : 
//                           'priority-low';
    
//     const handleUpdateClick = () => {
//         navigate(`/update-task/${task.id}`);
//     };

//     const handleDeleteClick = () => {
//         deleteTask(task.id);
//     };

//     const handleSubmit = () => {
//         markAsCompleted(task.id); // Mark the task as completed
//     };

//     return (
//         <div className="task-card">
//             {/* Priority Dot */}
//             <div className={`priority-dot ${priorityClass}`} />
            
//             {/* Task Details */}
//             <h3>{task.title}</h3>
//             <p className="description">{task.description}</p>
//             <p className="due-date-time">
//                 <span className="due-date-label">Due Date:</span> {task.dueDate} 
//                 <span className="due-time">at {task.dueTime}</span>
//             </p>
//             <p className="priority">Priority: {task.priority}</p>
            
//             {/* Update and Delete Buttons */}
//             <div className="task-actions">
//                 <button onClick={handleUpdateClick} className="update-button">Update</button>
//                 {task.status !== 'completed' && (
//                     <button onClick={handleSubmit} className="submit-button">Submit</button>
//                 )}
//                 <button onClick={handleDeleteClick} className="delete-button">Delete</button>
//             </div>
//         </div>
//     );
// }

// export default TaskCard;


import React from 'react';
import './taskCard.css'; // Import the CSS file for styling
import { useNavigate } from 'react-router-dom';

function TaskCard({ task, deleteTask, markAsCompleted }) {
    const navigate = useNavigate();
    
    // Determine the priority class
    const priorityClass = task.priority === 'high' ? 'priority-high' : 
                          task.priority === 'medium' ? 'priority-medium' : 
                          'priority-low';

    // Navigate to the update task page
    const handleUpdateClick = () => {
        navigate(`/update-task/${task.id}`);
    };

    // Handle task deletion
    const handleDeleteClick = () => {
        deleteTask(task.id);
    };

    // Handle marking task as completed
    const handleCompleteClick = () => {
        markAsCompleted(task.id); // Mark the task as completed
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
                <span className="due-time"> at {task.dueTime}</span>
            </p>
            <p className="priority">Priority: {task.priority}</p>
            
            {/* Update, Mark Completed, and Delete Buttons */}
            <div className="task-actions">
                <button onClick={handleUpdateClick} className="update-button">Update</button>
                
                {/* Only show 'Mark as Completed' if task is not already completed */}
                {task.status !== 'completed' && (
                    <button onClick={handleCompleteClick} className="submit-button">
                        Mark as Completed
                    </button>
                )}

                <button onClick={handleDeleteClick} className="delete-button">Delete</button>
            </div>
        </div>
    );
}

export default TaskCard;