import React, { useState } from 'react';
import './App.css';
import './components/homePage.css'
import Navbar from './components/navbar';
import CreateTask from './components/createTask';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskCard from './components/taskCard';
import './components/taskGrid.css';

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
  const now = new Date();

    const upcomingTasks = tasks.filter(task => new Date(task.dueDate) > now && !task.completed);
    const overdueTasks = tasks.filter(task => new Date(task.dueDate) < now && !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    return (
        <div className="home-page">
            <div className="task-column">
                <h2>Upcoming Tasks</h2>
                {upcomingTasks.length > 0 ? (
                    upcomingTasks.map(task => <TaskCard key={task.id} task={task} />)
                ) : (
                    <p>No upcoming tasks.</p>
                )}
            </div>
            <div className="task-column">
                <h2>Overdue Tasks</h2>
                {overdueTasks.length > 0 ? (
                    overdueTasks.map(task => <TaskCard key={task.id} task={task} />)
                ) : (
                    <p>No overdue tasks.</p>
                )}
            </div>
            <div className="task-column">
                <h2>Completed Tasks</h2>
                {completedTasks.length > 0 ? (
                    completedTasks.map(task => <TaskCard key={task.id} task={task} />)
                ) : (
                    <p>No completed tasks.</p>
                )}
            </div>
        </div>
    );
}


export default App;

