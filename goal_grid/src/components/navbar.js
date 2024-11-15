import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from './dropDown';
import './navbar.css';

function Navbar({ onFilterSelect }) {
    return (
        <nav className="navbar">
            {/* Wrap the brand name in a Link component */}
            <Link to="/" className="navbar-brand">
                GoalGrid
            </Link>
            <div className="navbar-actions">
                <Link to="/create-task">
                    <button className="navbar-button">New Task</button>
                </Link>
                <div className="filter-container">
                    <Dropdown onSelect={onFilterSelect} /> 
                </div>
            </div>
        </nav>
    );
}

export default Navbar;