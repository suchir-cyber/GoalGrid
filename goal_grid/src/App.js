import React, { useState, useEffect } from 'react';
import './App.css';
import './components/homePage.css';
import Navbar from './components/navbar';
import CreateTask from './components/createTask';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskCard from './components/taskCard';
import TaskTab from './components/taskTab'; 
import './components/taskGrid.css';
import UpdateTask from './components/updateTask';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTab, setSelectedTab] = useState('upcoming');
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filterOption, setFilterOption] = useState(''); 


  const addTask = (newTask) => {
    const taskWithId = {
      ...newTask,
      id: tasks.length + 1,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, taskWithId]);
  };

 
  const deleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId)); 
  };

  const markAsCompleted = (taskId) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, status: 'completed', completed: true } : task
      )
    );
  };

  
  const updateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map(task =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };

 
  const updateTaskStatus = () => {
    const now = new Date();
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        const dueDateTime = new Date(`${task.dueDate}T${task.dueTime}`);
        if (task.status !== 'completed' && dueDateTime < now) {
          return { ...task, status: 'overdue' }; 
        }
        return task;
      })
    );
  };

  useEffect(() => {

    updateTaskStatus();


    const now = new Date();
    const msUntilNextMinute = (60 - now.getSeconds()) * 1000;

    const initialTimeout = setTimeout(() => {

      updateTaskStatus(); 
      const intervalId = setInterval(updateTaskStatus, 60000);

      return () => clearInterval(intervalId);
    }, msUntilNextMinute);


    return () => clearTimeout(initialTimeout);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };


  const filteredTasks = tasks.filter((task) => {
    return (
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });


  const handleFilterSelect = (option) => {
    setFilterOption(option);
  };


  const sortedTasks = () => {
    let sorted = [...filteredTasks];
    if (filterOption === 'all') {
      return sorted;
    }
    else if (filterOption === 'high') {
      sorted = sorted.filter(task => task.priority === 'High');
    } else if (filterOption === 'medium') {
      sorted = sorted.filter(task => task.priority === 'Medium');
    } else if (filterOption === 'low') {
      sorted = sorted.filter(task => task.priority === 'Low');
    }

    return sorted};

  return (
    <Router>
      <Navbar onFilterSelect={handleFilterSelect} />
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
          element={<HomePage tasks={sortedTasks()} 
          selectedTab={selectedTab} deleteTask={deleteTask} markAsCompleted={markAsCompleted} />}
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
        <div className="no-tasks-message">
                    <h1>No Tasks</h1>
        </div>
      )}
    </div>
  );
}

export default App;