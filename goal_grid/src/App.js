import './App.css';
import Navbar from './components/navbar';
import CreateTask from './components/createTask';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route path="/" element={<h2>Welcome to MyApp</h2>} />
              <Route path="/create-task" element={<CreateTask />} />
          </Routes>
      </Router>
  );
}

export default App;
