// UpdateTask.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './createTask.css';

function UpdateTask({ tasks, updateTask }) {
    const { taskId } = useParams(); // Get taskId from the URL
    const navigate = useNavigate();

    // Initialize state with a default value
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        dueTime: '',
        priority: 'Low'
    });

    // Find the task to update by ID
    useEffect(() => {
        const taskToUpdate = tasks.find(task => task.id === parseInt(taskId));
        if (!taskToUpdate) {  
            navigate('/'); // Redirect if task is not found
        } else {
            setTask(taskToUpdate); // Set state if task is found
        }
    }, [taskId, tasks, navigate]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload

        // Update the task
        updateTask(task);

        // Navigate back to the homepage
        navigate('/');
    };

    return (
        <div className="create-task">
            <h2>Update Task</h2>
            <form onSubmit={handleSubmit} className="task-form">
                <label>
                    Title
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Description
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        rows="4"
                    />
                </label>
                <label>
                    Due Date
                    <input
                        type="date"
                        name="dueDate"
                        value={task.dueDate}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Due Time
                    <input
                        type="time"
                        name="dueTime"
                        value={task.dueTime}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Priority Level
                    <select
                        name="priority"
                        value={task.priority}
                        onChange={handleChange}
                    >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                    </select>
                </label>
                <button type="submit" className="create-button">Update Task</button>
            </form>
        </div>
    );
}

export default UpdateTask;