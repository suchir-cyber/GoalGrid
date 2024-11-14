// goal_grid/src/components/Dropdown.js
import React, { useState } from 'react';
import './dropDown.css'; // Create a CSS file for styling

function Dropdown({ onSelect }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option) => {
        onSelect(option);
        setIsOpen(false);
    };

    return (
        <div className="dropdown">
            <button onClick={handleToggle} className="dropdown-button">
                Filter
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    <div onClick={() => handleSelect('lowToHigh')}>Low to High</div>
                    <div onClick={() => handleSelect('highToLow')}>High to Low</div>
                    <div onClick={() => handleSelect('high')}>High Priority</div>
                    <div onClick={() => handleSelect('medium')}>Medium Priority</div>
                    <div onClick={() => handleSelect('low')}>Low Priority</div>
                </div>
            )}
        </div>
    );
}

export default Dropdown;