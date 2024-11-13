import React from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import CreateTask from './createTask';

function Navbar() {
   
    const navigate = useNavigate();

    const handleNewPostClick = () => {
        navigate('/create-task');  
    };


    return (
        <nav className="navbar">
            <div className="navbar-brand">GoalGrid</div>
            <button className="navbar-button" onClick={handleNewPostClick}>New Post</button>
        </nav>
    );
}

export default Navbar;
