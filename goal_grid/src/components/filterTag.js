// src/components/FilterDropdown.js
import React, { useState } from 'react';
import './filterTag.css'; // Create a CSS file for styling

const FilterDropdown = ({ tasks, setFilteredTasks }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleFilterChange = (filterType, value) => {
        let filteredTasks = [...tasks];

        if (filterType === 'priority') {
            if (value === 'Low to High') {
                filteredTasks.sort((a, b) => a.priority.localeCompare(b.priority));
            } else if (value === 'High to Low') {
                filteredTasks.sort((a, b) => b.priority.localeCompare(a.priority));
            } else {
                filteredTasks = filteredTasks.filter(task => task.priority === value);
            }
        } else if (filterType === 'dueTime') {
            if (value === 'Recent to Old') {
                filteredTasks.sort((a, b) => new Date(a.dueDate + 'T' + a.dueTime) - new Date(b.dueDate + 'T' + b.dueTime));
            } else if (value === 'Old to Recent') {
                filteredTasks.sort((a, b) => new Date(b.dueDate + 'T' + b.dueTime) - new Date(a.dueDate + 'T' + a.dueTime));
            }
        }

        setFilteredTasks(filteredTasks);
        setIsOpen(false);
    };

    return (
        <div className="filter-dropdown">
            <button onClick={toggleDropdown} className="filter-button">
                Filter
            </button>
            {isOpen && (
                <div className="dropdown-content">
                    <div className="filter-section">
                        <h4>Priority Ordering</h4>
                        <button onClick={() => handleFilterChange('priority', 'Low to High')}>Low to High</button>
                        <button onClick={() => handleFilterChange('priority', 'High to Low')}>High to Low</button>
                        <button onClick={() => handleFilterChange('priority', 'High')}>High</button>
                        <button onClick={() => handleFilterChange('priority', 'Medium')}>Medium</button>
                        <button onClick={() => handleFilterChange('priority', 'Low')}>Low</button>
                    </div>
                    <div className="filter-section">
                        <h4>Due Time</h4>
                        <button onClick={() => handleFilterChange('dueTime', 'Recent to Old')}>Recent to Old</button>
                        <button onClick={() => handleFilterChange('dueTime', 'Old to Recent')}>Old to Recent</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;