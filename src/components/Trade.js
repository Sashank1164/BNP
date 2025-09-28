import React, { useEffect, useState } from "react";
import {
  BarChart, Bar,
  LineChart, Line,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from "recharts";
import "./Trade.css";

const Trade = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://7vfbqc23-5001.asse.devtunnels.ms/customer/master/all")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching trade data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Trade Data...</p>;

  // Chart 1: Instrument vs RiskCategory
  const instrumentRiskMap = {};
  data.forEach((item) => {
    const key = `${item.Instrument} - ${item.RiskCategory}`;
    instrumentRiskMap[key] = (instrumentRiskMap[key] || 0) + 1;
  });
  const chart1Data = Object.keys(instrumentRiskMap).map((key) => ({
    instrumentRisk: key,
    count: instrumentRiskMap[key],
  }));

  // Chart 2: TradeValue vs RiskCategory
  const tradeValueMap = {};
  data.forEach((item) => {
    const risk = item.RiskCategory;
    const value = parseFloat(item.TradeValue) || 0;
    tradeValueMap[risk] = (tradeValueMap[risk] || 0) + value;
  });
  const chart2Data = Object.keys(tradeValueMap).map((risk) => ({
    riskCategory: risk,
    tradeValue: tradeValueMap[risk],
  }));

  // Chart 3: TradeDate vs Customer_ID
  const dateCustomerMap = {};
  data.forEach((item) => {
    const key = `${item.TradeDate} - ${item.Customer_ID}`;
    dateCustomerMap[key] = (dateCustomerMap[key] || 0) + 1;
  });
  const chart3Data = Object.keys(dateCustomerMap).map((key) => ({
    tradeDateCustomer: key,
    trades: dateCustomerMap[key],
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      Chart 1
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-bold mb-4">Instrument vs RiskCategory</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chart1Data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="instrumentRisk" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      Chart 2
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-bold mb-4">TradeValue vs RiskCategory</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chart2Data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="riskCategory" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="tradeValue" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      Chart 3
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-bold mb-4">TradeDate vs Customer_ID</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chart3Data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tradeDateCustomer" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="trades" stroke="#16a34a" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Trade;


// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./Sidebar.css";
// import Dashboard from "./Dashboard.css";
// import Retail from "./Retail.css";
// import CreditDashboard from "./Credit_card.css";
// import Trade from "./Trade.css";

// function App() {
//   const [activeItem, setActiveItem] = useState("Home");

//   return (
//     <Router>
//       <div className="app">
//         <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />

//         <div className="main-content">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/retail" element={<Retail />} />
//             <Route path="/credit" element={<CreditDashboard />} />
//             <Route path="/trade" element={<Trade />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default App;
