

import React, { useState, useEffect } from 'react';
import './App.css';
import './components/homePage.css';
import Navbar from './components/navbar';
import CreateTask from './components/createTask';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskCard from './components/taskCard';
import TaskTab from './components/taskTab'; // Assuming TaskTab component is created for tabs
import './components/taskGrid.css';
import UpdateTask from './components/updateTask';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState(''); // For search input

  // Function to add task to the state
  const addTask = (newTask) => {
    const taskWithId = {
        ...newTask,
        id: tasks.length + 1 // Assuming IDs are sequential based on the current length of the tasks array
    };
    setTasks((prevTasks) => [...prevTasks, taskWithId]);
};

  // Function to delete a task
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId)); // Filter out the task with the given id
  };

  const markAsCompleted = (taskId) => {
    setTasks(prevTasks =>
        prevTasks.map(task =>
            task.id === taskId ? { ...task, status: 'completed' } : task
        )
    );
};

  // Function to update a task
  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

  // Function to update the tab based on the current time
  const updateTaskStatus = () => {
    const now = new Date();
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        const dueDateTime = new Date(`${task.dueDate}T${task.dueTime}`);
        if (!task.completed && dueDateTime < now) {
          return { ...task, status: 'overdue' }; // Mark task as overdue
        }
        return task;
      })
    );
  };

  useEffect(() => {
    // Initial task update on mount
    updateTaskStatus();

    // Calculate the time until the next minute
    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000;

    // Set a timeout to align with the start of the next minute
    const initialTimeout = setTimeout(() => {
      // Then, set an interval to update every minute
      updateTaskStatus(); // Update immediately at the next minute
      const intervalId = setInterval(updateTaskStatus, 60000);

      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }, msUntilNextMinute);

    // Clear the initial timeout if the component unmounts
    return () => clearTimeout(initialTimeout);
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter tasks based on the search query
  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <Router>
      <Navbar />
      <TaskTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      
      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <Routes>
        <Route
          path="/"
          element={<HomePage tasks={filteredTasks} selectedTab={selectedTab} deleteTask={deleteTask} />}
        />
        <Route path="/create-task" element={<CreateTask addTask={addTask} />} />
        <Route path="/update-task/:taskId" element={<UpdateTask tasks={tasks} updateTask={updateTask} />} />
      </Routes>
    </Router>
  );
}

function HomePage({ tasks, selectedTab, deleteTask, markAsCompleted }) {
  const now = new Date();

  const getTaskDateTime = (task) => {
    const date = new Date(task.dueDate);
    const [hours, minutes] = task.dueTime.split(':');
    date.setHours(hours, minutes);
    return date;
  };

  const filteredTasks = tasks.filter(task => {
    const taskDateTime = getTaskDateTime(task);

    if (selectedTab === 'upcoming') return taskDateTime > now && task.status !== 'completed';
    if (selectedTab === 'overdue') return taskDateTime < now && task.status !== 'completed';
    if (selectedTab === 'completed') return task.status === 'completed';
    return false;
  });

  return (
    <div className="task-grid">
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => <TaskCard key={task.id} task={task} 
         deleteTask={deleteTask} markAsCompleted={markAsCompleted} />)
      ) : (
        <p>No tasks available.</p>
      )}
    </div>
  );
}

export default App;
