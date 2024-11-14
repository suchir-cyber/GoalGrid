import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './createTask.css';

function CreateTask({ addTask }) {
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        dueTime: '',  // Add dueTime to initial state
        priority: 'Low',
    });
    const navigate = useNavigate();

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload

        // Add the new task to the task list in App.js
        addTask(task);

        // Reset the form fields
        setTask({ title: '', description: '', dueDate: '', dueTime: '', priority: 'Low' });

        // Navigate back to the homepage ("/")
        navigate('/');
    };

    return (
        <div className="create-task">
            <h2>Create New Task</h2>
            <form onSubmit={handleSubmit} className="task-form">
                <label>
                    Title
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        required
                        placeholder="Enter task title"
                    />
                </label>
                <label>
                    Description
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        placeholder="Enter task description"
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
                <button type="submit" className="create-button">Create Task</button>
            </form>
        </div>
    );
}

export default CreateTask;
