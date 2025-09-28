// import React, { useEffect, useState } from "react";
// import {
//   BarChart, Bar,
//   LineChart, Line,
//   XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
// } from "recharts";
// import "./Trade.css";

// const Trade = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("https://7vfbqc23-5001.asse.devtunnels.ms/customer/master/all")
//       .then((res) => res.json())
//       .then((json) => {
//         setData(json);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching trade data:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading Trade Data...</p>;

//   // Chart 1: Instrument vs RiskCategory
//   const instrumentRiskMap = {};
//   data.forEach((item) => {
//     const key = `${item.Instrument} - ${item.RiskCategory}`;
//     instrumentRiskMap[key] = (instrumentRiskMap[key] || 0) + 1;
//   });
//   const chart1Data = Object.keys(instrumentRiskMap).map((key) => ({
//     instrumentRisk: key,
//     count: instrumentRiskMap[key],
//   }));

//   // Chart 2: TradeValue vs RiskCategory
//   const tradeValueMap = {};
//   data.forEach((item) => {
//     const risk = item.RiskCategory;
//     const value = parseFloat(item.TradeValue) || 0;
//     tradeValueMap[risk] = (tradeValueMap[risk] || 0) + value;
//   });
//   const chart2Data = Object.keys(tradeValueMap).map((risk) => ({
//     riskCategory: risk,
//     tradeValue: tradeValueMap[risk],
//   }));

//   // Chart 3: TradeDate vs Customer_ID
//   const dateCustomerMap = {};
//   data.forEach((item) => {
//     const key = `${item.TradeDate} - ${item.Customer_ID}`;
//     dateCustomerMap[key] = (dateCustomerMap[key] || 0) + 1;
//   });
//   const chart3Data = Object.keys(dateCustomerMap).map((key) => ({
//     tradeDateCustomer: key,
//     trades: dateCustomerMap[key],
//   }));

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
//       Chart 1
//       <div className="bg-white shadow rounded-2xl p-4">
//         <h2 className="text-lg font-bold mb-4">Instrument vs RiskCategory</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chart1Data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="instrumentRisk" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="count" fill="#2563eb" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       Chart 2
//       <div className="bg-white shadow rounded-2xl p-4">
//         <h2 className="text-lg font-bold mb-4">TradeValue vs RiskCategory</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={chart2Data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="riskCategory" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="tradeValue" fill="#facc15" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       Chart 3
//       <div className="bg-white shadow rounded-2xl p-4">
//         <h2 className="text-lg font-bold mb-4">TradeDate vs Customer_ID</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={chart3Data}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="tradeDateCustomer" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="trades" stroke="#16a34a" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default Trade;


// // import React, { useState } from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import Sidebar from "./Sidebar.css";
// // import Dashboard from "./Dashboard.css";
// // import Retail from "./Retail.css";
// // import CreditDashboard from "./Credit_card.css";
// // import Trade from "./Trade.css";

// // function App() {
// //   const [activeItem, setActiveItem] = useState("Home");

// //   return (
// //     <Router>
// //       <div className="app">
// //         <Sidebar activeItem={activeItem} onItemClick={setActiveItem} />

// //         <div className="main-content">
// //           <Routes>
// //             <Route path="/" element={<Dashboard />} />
// //             <Route path="/retail" element={<Retail />} />
// //             <Route path="/credit" element={<CreditDashboard />} />
// //             <Route path="/trade" element={<Trade />} />
// //           </Routes>
// //         </div>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;
import React, { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

export default function TradeDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5001/customer/trade_master/all")
      .then(res => res.json())
      .then(json => {
        setData(json.results || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Trade Data...</p>;

  // --- KPIs ---
  const totalTrades = data.length;
  const totalPnL = data.reduce((acc, t) => acc + (parseFloat(t.PnL) || 0), 0);
  const totalTradeValue = data.reduce((acc, t) => acc + (parseFloat(t.TradeValue) || 0), 0);
  const uniqueCustomers = new Set(data.map(t => t.CustomerID)).size;

  // --- Trades by Instrument ---
  const tradesByInstrument = Object.values(
    data.reduce((acc, t) => {
      acc[t.Instrument] = acc[t.Instrument] || { Instrument: t.Instrument, Trades: 0 };
      acc[t.Instrument].Trades += 1;
      return acc;
    }, {})
  );

  // --- TradeValue by RiskCategory ---
  const tradeValueByRisk = Object.values(
    data.reduce((acc, t) => {
      acc[t.RiskCategory] = acc[t.RiskCategory] || { RiskCategory: t.RiskCategory, TradeValue: 0 };
      acc[t.RiskCategory].TradeValue += parseFloat(t.TradeValue) || 0;
      return acc;
    }, {})
  );

  // --- Trades over Time ---
  const tradesOverTime = Object.values(
    data.reduce((acc, t) => {
      const date = new Date(t.TradeDate).toISOString().slice(0,10); // YYYY-MM-DD
      acc[date] = acc[date] || { Date: date, Trades: 0 };
      acc[date].Trades += 1;
      return acc;
    }, {})
  ).sort((a,b) => new Date(a.Date) - new Date(b.Date));

  // --- TradeType Distribution ---
  const tradeTypeDistribution = Object.values(
    data.reduce((acc, t) => {
      acc[t.TradeType] = acc[t.TradeType] || { Type: t.TradeType, Count: 0 };
      acc[t.TradeType].Count += 1;
      return acc;
    }, {})
  );

  return (
    <div className="p-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-2xl p-4 text-center">
          <h3>Total Trades</h3>
          <p className="text-2xl">{totalTrades}</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 text-center">
          <h3>Total PnL</h3>
          <p className="text-2xl">{totalPnL.toFixed(2)}</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 text-center">
          <h3>Total Trade Value</h3>
          <p className="text-2xl">{totalTradeValue.toFixed(2)}</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 text-center">
          <h3>Unique Customers</h3>
          <p className="text-2xl">{uniqueCustomers}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trades by Instrument */}
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="mb-4 font-bold">Trades by Instrument</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tradesByInstrument}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="Instrument"/>
              <YAxis/>
              <Tooltip/>
              <Legend/>
              <Bar dataKey="Trades" fill="#2563eb"/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* TradeValue by RiskCategory */}
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="mb-4 font-bold">Trade Value by Risk Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tradeValueByRisk}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="RiskCategory"/>
              <YAxis/>
              <Tooltip/>
              <Legend/>
              <Bar dataKey="TradeValue" fill="#facc15"/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Trades over Time */}
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="mb-4 font-bold">Trades over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={tradesOverTime}>
              <CartesianGrid strokeDasharray="3 3"/>
              <XAxis dataKey="Date"/>
              <YAxis/>
              <Tooltip/>
              <Legend/>
              <Line type="monotone" dataKey="Trades" stroke="#16a34a"/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Trade Type Distribution */}
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="mb-4 font-bold">Trade Type Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={tradeTypeDistribution}
                dataKey="Count"
                nameKey="Type"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {tradeTypeDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
