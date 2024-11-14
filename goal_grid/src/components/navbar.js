// goal_grid/src/components/navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './dropDown'; // Import the Dropdown component
import './navbar.css';

function Navbar({ onFilterSelect }) {
    return (
        <nav className="navbar">
            <div className="navbar-brand">MyApp</div>
            <Link to="/create-task">
                <button className="navbar-button">New Task</button>
            </Link>
            <Dropdown onSelect={onFilterSelect} /> {/* Add the Dropdown here */}
        </nav>
    );
}

export default Navbar;