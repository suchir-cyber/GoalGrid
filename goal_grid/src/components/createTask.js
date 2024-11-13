import React, { useState } from 'react';
import './createTask.css';

function CreateTask() {
    const [task, setTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        priority: 'Low',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask({ ...task, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to save the task (e.g., API call or state update)
        console.log('Task Created:', task);
        // Reset form after submission
        setTask({ title: '', description: '', dueDate: '', priority: 'Low' });
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
