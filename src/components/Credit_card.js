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
import "./Credit_card.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

const CreditDashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5001/customer/xml_master/all")
      .then((res) => setData(res.data.results || []))
      .catch((err) => console.error(err));
  }, []);

  if (!data.length) return <p>Loading Credit Dashboard...</p>;

  // --- Aggregate Data ---
  const balanceByTenure = Object.values(
    data.reduce((acc, item) => {
      const tenure = item.TENURE;
      acc[tenure] = acc[tenure] || { Tenure: tenure, TotalBalance: 0 };
      acc[tenure].TotalBalance += parseFloat(item.BALANCE || 0);
      return acc;
    }, {})
  );

  const purchasesByTenure = Object.values(
    data.reduce((acc, item) => {
      const tenure = item.TENURE;
      const purchases =
        parseFloat(item.ONEOFF_PURCHASES || 0) +
        parseFloat(item.INSTALLMENTS_PURCHASES || 0);
      acc[tenure] = acc[tenure] || { Tenure: tenure, TotalPurchases: 0 };
      acc[tenure].TotalPurchases += purchases;
      return acc;
    }, {})
  );

  const cashAdvanceDistribution = Object.values(
    data.reduce((acc, item) => {
      const value = parseFloat(item.CASH_ADVANCE || 0);
      const rangeStart = Math.floor(value / 1000) * 1000;
      const key = `${rangeStart}-${rangeStart + 999}`;
      acc[key] = acc[key] || { Range: key, Total: 0 };
      if (value > 0) acc[key].Total += 1;
      return acc;
    }, {})
  );

  const creditUtilization = data.map((item) => ({
    Customer: item.CUST_ID,
    Utilization:
      parseFloat(item.BALANCE || 0) / parseFloat(item.CREDIT_LIMIT || 1),
  }));

  const paymentsVsMin = data.map((item) => ({
    Customer: item.CUST_ID,
    Payments: parseFloat(item.PAYMENTS || 0),
    MinPayments: parseFloat(item.MINIMUM_PAYMENTS || 0),
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {/* Chart 1: Balance by Tenure */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-bold mb-4">Total Balance by Tenure</h2>
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

      {/* Chart 2: Purchases by Tenure */}
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

      {/* Chart 3: Cash Advance Distribution */}
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

      {/* Chart 4: Credit Utilization */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-bold mb-4">Credit Utilization (Balance/Credit Limit)</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={creditUtilization}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Customer" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Utilization" fill="#ff7300" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Chart 5: Payments vs Minimum Payments */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h2 className="text-lg font-bold mb-4">Payments vs Minimum Payments</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={paymentsVsMin}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Customer" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Payments" fill="#0088FE" />
            <Bar dataKey="MinPayments" fill="#FF8042" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CreditDashboard;
