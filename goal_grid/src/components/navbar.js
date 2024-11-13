import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">MyApp</div>
            <Link to="/create-task">
                <button className="navbar-button">New Task</button>
            </Link>
        </nav>
    );
}

export default Navbar;
