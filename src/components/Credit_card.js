// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
//   BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
// } from "recharts";
// import "./Credit.css"; // optional if you want separate CSS

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

// const CreditDashboard = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://your-postman-api.com/credit") // replace with your API
//       .then((res) => setData(res.data))
//       .catch((err) => console.error(err));
//   }, []);

//   // Chart 1: Balance by Tenure
//   const balanceByTenure = Object.values(
//     data.reduce((acc, item) => {
//       const tenure = item.TENURE;
//       acc[tenure] = acc[tenure] || { Tenure: tenure, TotalBalance: 0 };
//       acc[tenure].TotalBalance += parseFloat(item.BALANCE || 0);
//       return acc;
//     }, {})
//   );

//   // Chart 2: Purchases by Tenure
//   const purchasesByTenure = Object.values(
//     data.reduce((acc, item) => {
//       const tenure = item.TENURE;
//       acc[tenure] = acc[tenure] || { Tenure: tenure, TotalPurchases: 0 };
//       acc[tenure].TotalPurchases += parseFloat(item.PURCHASES || 0);
//       return acc;
//     }, {})
//   );

//   // Chart 3: Cash Advance Distribution
//   const cashAdvanceDistribution = Object.values(
//     data.reduce((acc, item) => {
//       const rangeStart = Math.floor(item.CASH_ADVANCE / 1000) * 1000;
//       const key = `${rangeStart}-${rangeStart + 999}`;
//       acc[key] = acc[key] || { Range: key, Total: 0 };
//       acc[key].Total += 1;
//       return acc;
//     }, {})
//   );

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
//       {/* Chart 1 */}
//       <div className="bg-white shadow rounded-2xl p-4">
//         <h2 className="text-lg font-bold mb-4">Balance by Tenure</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={balanceByTenure}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="Tenure" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Line type="monotone" dataKey="TotalBalance" stroke="#8884d8" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Chart 2 */}
//       <div className="bg-white shadow rounded-2xl p-4">
//         <h2 className="text-lg font-bold mb-4">Purchases by Tenure</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <BarChart data={purchasesByTenure}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="Tenure" />
//             <YAxis />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="TotalPurchases" fill="#82ca9d" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Chart 3 */}
//       <div className="bg-white shadow rounded-2xl p-4">
//         <h2 className="text-lg font-bold mb-4">Cash Advance Distribution</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <PieChart>
//             <Pie
//               data={cashAdvanceDistribution}
//               dataKey="Total"
//               nameKey="Range"
//               cx="50%"
//               cy="50%"
//               outerRadius={100}
//               label
//             >
//               {cashAdvanceDistribution.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
// };

// export default CreditDashboard;



import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";
import "./Credit_card.css"; // optional if you want separate CSS

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

const CreditDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("https://your-postman-api.com/credit") // replace with your API
      .then((res) => setData(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Chart 1: Balance by Tenure
  const balanceByTenure = Object.values(
    data.reduce((acc, item) => {
      const tenure = item.TENURE;
      acc[tenure] = acc[tenure] || { Tenure: tenure, TotalBalance: 0 };
      acc[tenure].TotalBalance += parseFloat(item.BALANCE || 0);
      return acc;
    }, {})
  );

  // Chart 2: Purchases by Tenure
  const purchasesByTenure = Object.values(
    data.reduce((acc, item) => {
      const tenure = item.TENURE;
      acc[tenure] = acc[tenure] || { Tenure: tenure, TotalPurchases: 0 };
      acc[tenure].TotalPurchases += parseFloat(item.PURCHASES || 0);
      return acc;
    }, {})
  );

  // Chart 3: Cash Advance Distribution
  const cashAdvanceDistribution = Object.values(
    data.reduce((acc, item) => {
      const rangeStart = Math.floor(item.CASH_ADVANCE / 1000) * 1000;
      const key = `${rangeStart}-${rangeStart + 999}`;
      acc[key] = acc[key] || { Range: key, Total: 0 };
      acc[key].Total += 1;
      return acc;
    }, {})
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Chart 1 */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-bold mb-4">Balance by Tenure</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={balanceByTenure}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Tenure" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="TotalBalance" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 2 */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-bold mb-4">Purchases by Tenure</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={purchasesByTenure}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Tenure" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="TotalPurchases" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 3 */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-bold mb-4">Cash Advance Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={cashAdvanceDistribution}
              dataKey="Total"
              nameKey="Range"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {cashAdvanceDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CreditDashboard;
