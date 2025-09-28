// import React from 'react';
// import './App.css';
// import Sidebar from './components/Sidebar';
// import Dashboard from './components/Dashboard';
// import Retail from './components/Retail';
// import CreditDashboard from './components/Credit_card';
// import { Router } from 'express';

// function App() {
//   return (
//     <div className="app">
//       <Sidebar />
//       <div className="main-content">
//         <Dashboard />
//         <Retail />
//         <CreditDashboard />
//       </div>
//     </div>
//   );
// }

// export default App;

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import "./App.css";
// import Sidebar from "./components/Sidebar";
// import Dashboard from "./components/Dashboard";
// import Retail from "./components/Retail";
// import CreditDashboard from "./components/Credit_card";
// import Trade from "./components/Trade";

// function App() {
//   const [activeItem, setActiveItem] = useState("Home");

//   return (
//     <Router>
//       <div className="app">
//         {/* <Sidebar activeItem={activeItem} onItemClick={setActiveItem} /> */}

//         <div className="main-content">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/retail" element={<Retail />} />
//             <Route path="/credit" element={<CreditDashboard />} />
//             {/* <Route path="/trade" element={<Trade />} /> */}
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Retail from "./components/Retail";
import CreditDashboard from "./components/Credit_card";
import Trade from "./components/Trade";
import Upi from './components/Upi';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar /> {/* Sidebar doesn't need to manage state now */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Dashboard />} />
            <Route path="/upi" element={<Upi />} />
            <Route path="/retail" element={<Retail />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/credit_card" element={<CreditDashboard />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
