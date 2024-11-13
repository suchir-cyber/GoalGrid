import React, { useState } from 'react';
import './App.css';
import './components/homePage.css'
import Navbar from './components/navbar';
import CreateTask from './components/createTask';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [tasks, setTasks] = useState([]); // State to hold tasks

  // Function to add task to the state
  const addTask = (newTask) => {
      setTasks((prevTasks) => [...prevTasks, newTask]); // Add new task to the tasks array
  };

  return (
      <Router>
          <Navbar />
          <Routes>
              {/* Home page route, where the task list will be displayed */}
              <Route path="/" element={<HomePage tasks={tasks} />} />
              {/* Route to CreateTask page, passing addTask function as a prop */}
              <Route path="/create-task" element={<CreateTask addTask={addTask} />} />
          </Routes>
      </Router>
  );
}

function HomePage({ tasks }) {
  return (
      <div style={{ padding: '20px' }}>
          <h2>Task List</h2>
          <div className="task-grid">
              {tasks.length > 0 ? (
                  tasks.map((task, index) => (
                      <div key={index} className="task-card">
                          <h3>{task.title}</h3>
                          <p><strong>Description:</strong> {task.description}</p>
                          <p><strong>Due Date:</strong> {task.dueDate}</p>
                          <p><strong>Priority:</strong> {task.priority}</p>
                      </div>
                  ))
              ) : (
                  <p>No tasks available.</p>
              )}
          </div>
      </div>
  );
}


export default App;


