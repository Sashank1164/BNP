// import React from 'react';
// import './Sidebar.css';
// import { FiHome, FiCreditCard, FiShoppingBag, FiTrendingUp, FiDollarSign } from 'react-icons/fi';

// const Sidebar = ({ activeItem, onItemClick }) => {
// const navigationItems = [
//   { id: 'Home', icon: FiHome, label: 'Home' },
//   { id: 'upi', icon: FiDollarSign, label: 'upi' }, // use UPPERCASE to match App.js
//   { id: 'RETAIL', icon: FiShoppingBag, label: 'RETAIL' },
//   { id: 'TRADE', icon: FiTrendingUp, label: 'TRADE' },
//   { id: 'CREDIT_CARD', icon: FiCreditCard, label: 'CREDIT CARD' }
// ];


//   return (
//     <div className="sidebar">
//       <nav className="sidebar-nav">
//         {navigationItems.map((item) => (
//           <div 
//             key={item.id}
//             className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
//             onClick={() => onItemClick(item.id)}
//           >
//             <item.icon className="nav-icon" />
//             <span className="nav-label">{item.label}</span>
//           </div>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Sidebar;

import React from 'react';
import './Sidebar.css';
import { FiHome, FiCreditCard, FiShoppingBag, FiTrendingUp, FiDollarSign } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navigationItems = [
    { path: '/home', icon: FiHome, label: 'Home' },
    { path: '/upi', icon: FiDollarSign, label: 'UPI' },
    { path: '/retail', icon: FiShoppingBag, label: 'RETAIL' },
    { path: '/trade', icon: FiTrendingUp, label: 'TRADE' },
    { path: '/credit_card', icon: FiCreditCard, label: 'CREDIT CARD' }
  ];

  return (
    <div className="sidebar">
      <nav className="sidebar-nav">
        {navigationItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <item.icon className="nav-icon" />
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
