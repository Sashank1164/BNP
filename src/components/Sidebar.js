import React from 'react';
import './Sidebar.css';
import { FiHome, FiCreditCard, FiShoppingBag, FiTrendingUp, FiDollarSign } from 'react-icons/fi';

const Sidebar = ({ activeItem, onItemClick }) => {
  const navigationItems = [
    { id: 'Home', icon: FiHome, label: 'Home' },
    { id: 'UPI', icon: FiDollarSign, label: 'UPI' },
    { id: 'RETAIL', icon: FiShoppingBag, label: 'RETAIL' },
    { id: 'TRADE', icon: FiTrendingUp, label: 'TRADE' },
    { id: 'CREDIT_CARD', icon: FiCreditCard, label: 'CREDIT CARD' }
  ];

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {navigationItems.map((item) => (
          <div 
            key={item.id}
            className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
            onClick={() => onItemClick(item.id)}
          >
            <item.icon className="nav-icon" />
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;

