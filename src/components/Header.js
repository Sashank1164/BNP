import React from 'react';
import './Header.css';
import { FiSearch, FiChevronDown } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="page-title">Dashboard</h1>
      </div>
      
      <div className="header-center">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search here..." 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-right">
        <div className="language-selector">
          <span>Eng (US)</span>
          <FiChevronDown className="dropdown-icon" />
        </div>
        
        <div className="user-profile">
          <div className="user-avatar">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
              alt="User Avatar"
            />
          </div>
          <div className="user-info">
            <span className="user-name">Musfiq</span>
            <span className="user-role">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
