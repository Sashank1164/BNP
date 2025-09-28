// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import {
// //   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
// //   BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
// // } from "recharts";

// // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

// // export default function RetailDashboard() {
// //   const [data, setData] = useState([]);

// //   useEffect(() => {
// //     // Replace this URL with your Postman API endpoint
// //     axios.get("http://127.0.0.1:5001/customer/retail_master/all")
// //       .then(res => setData(res.data))
// //       .catch(err => console.error(err));
// //   }, []);

// //   // Purchases by Year
// //   const purchasesByYear = Object.values(
// //     data.reduce((acc, item) => {
// //       const year = item.Year;
// //       acc[year] = acc[year] || { Year: year, Purchases: 0 };
// //       acc[year].Purchases += parseInt(item.Total_Purchases || 0);
// //       return acc;
// //     }, {})
// //   );

// //   // Purchases by Product Category
// //   const purchasesByCategory = Object.values(
// //     data.reduce((acc, item) => {
// //       const category = item.Product_Category;
// //       acc[category] = acc[category] || { Category: category, Purchases: 0 };
// //       acc[category].Purchases += parseInt(item.Total_Purchases || 0);
// //       return acc;
// //     }, {})
// //   );

// //   // Purchases by Payment Method
// //   const purchasesByPayment = Object.values(
// //     data.reduce((acc, item) => {
// //       const method = item.Payment_Method;
// //       acc[method] = acc[method] || { Method: method, Purchases: 0 };
// //       acc[method].Purchases += parseInt(item.Total_Purchases || 0);
// //       return acc;
// //     }, {})
// //   );

// //   return (
// //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">

// //       {/* Purchases by Year */}
// //       <div className="bg-white shadow rounded-2xl p-4">
// //         <h2 className="text-lg font-bold mb-4">Purchases by Year</h2>
// //         <ResponsiveContainer width="100%" height={300}>
// //           <LineChart data={purchasesByYear}>
// //             <CartesianGrid strokeDasharray="3 3" />
// //             <XAxis dataKey="Year" />
// //             <YAxis />
// //             <Tooltip />
// //             <Legend />
// //             <Line type="monotone" dataKey="Purchases" stroke="#8884d8" />
// //           </LineChart>
// //         </ResponsiveContainer>
// //       </div>

// //       {/* Purchases by Product Category */}
// //       <div className="bg-white shadow rounded-2xl p-4">
// //         <h2 className="text-lg font-bold mb-4">Purchases by Category</h2>
// //         <ResponsiveContainer width="100%" height={300}>
// //           <BarChart data={purchasesByCategory}>
// //             <CartesianGrid strokeDasharray="3 3" />
// //             <XAxis dataKey="Category" />
// //             <YAxis />
// //             <Tooltip />
// //             <Legend />
// //             <Bar dataKey="Purchases" fill="#82ca9d" />
// //           </BarChart>
// //         </ResponsiveContainer>
// //       </div>

// //       {/* Purchases by Payment Method */}
// //       <div className="bg-white shadow rounded-2xl p-4">
// //         <h2 className="text-lg font-bold mb-4">Purchases by Payment Method</h2>
// //         <ResponsiveContainer width="100%" height={300}>
// //           <PieChart>
// //             <Pie
// //               data={purchasesByPayment}
// //               dataKey="Purchases"
// //               nameKey="Method"
// //               cx="50%"
// //               cy="50%"
// //               outerRadius={100}
// //               label
// //             >
// //               {purchasesByPayment.map((entry, index) => (
// //                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //               ))}
// //             </Pie>
// //             <Tooltip />
// //           </PieChart>
// //         </ResponsiveContainer>
// //       </div>
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
//   BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
// } from "recharts";

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

// export default function RetailDashboard() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get("http://127.0.0.1:5001/customer/retail_master/all")
//       .then(res => setData(res.data.results || []))
//       .catch(err => console.error(err));
//   }, []);

//   // --------- Derived Insights ---------
//   const totalCustomers = new Set(data.map(item => item.Customer_ID)).size;
//   const totalTransactions = data.length;
//   const totalRevenue = data.reduce((acc, item) => acc + parseFloat(item.Total_Amount || 0), 0);

//   // Purchases by Year
//   const purchasesByYear = Object.values(
//     data.reduce((acc, item) => {
//       const year = item.Year;
//       acc[year] = acc[year] || { Year: year, Purchases: 0 };
//       acc[year].Purchases += parseInt(item.Total_Purchases || 0);
//       return acc;
//     }, {})
//   );

//   // Purchases by Product Category
//   const purchasesByCategory = Object.values(
//     data.reduce((acc, item) => {
//       const category = item.Product_Category;
//       acc[category] = acc[category] || { Category: category, Purchases: 0 };
//       acc[category].Purchases += parseInt(item.Total_Purchases || 0);
//       return acc;
//     }, {})
//   );

//   // Purchases by Payment Method
//   const purchasesByPayment = Object.values(
//     data.reduce((acc, item) => {
//       const method = item.Payment_Method;
//       acc[method] = acc[method] || { Method: method, Purchases: 0 };
//       acc[method].Purchases += parseInt(item.Total_Purchases || 0);
//       return acc;
//     }, {})
//   );

//   return (
//     <div className="p-6">
//       {/* KPIs */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <div className="bg-white shadow rounded-2xl p-4 text-center">
//           <h3 className="font-bold text-gray-500">Total Customers</h3>
//           <p className="text-2xl">{totalCustomers}</p>
//         </div>
//         <div className="bg-white shadow rounded-2xl p-4 text-center">
//           <h3 className="font-bold text-gray-500">Total Transactions</h3>
//           <p className="text-2xl">{totalTransactions}</p>
//         </div>
//         <div className="bg-white shadow rounded-2xl p-4 text-center">
//           <h3 className="font-bold text-gray-500">Total Revenue</h3>
//           <p className="text-2xl">${totalRevenue.toFixed(2)}</p>
//         </div>
//       </div>

//       {/* Charts */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Purchases by Year */}
//         <div className="bg-white shadow rounded-2xl p-4">
//           <h2 className="text-lg font-bold mb-4">Purchases by Year</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={purchasesByYear}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="Year" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Line type="monotone" dataKey="Purchases" stroke="#8884d8" />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Purchases by Product Category */}
//         <div className="bg-white shadow rounded-2xl p-4">
//           <h2 className="text-lg font-bold mb-4">Purchases by Category</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={purchasesByCategory}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="Category" />
//               <YAxis />
//               <Tooltip />
//               <Legend />
//               <Bar dataKey="Purchases" fill="#82ca9d" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Purchases by Payment Method */}
//         <div className="bg-white shadow rounded-2xl p-4">
//           <h2 className="text-lg font-bold mb-4">Purchases by Payment Method</h2>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={purchasesByPayment}
//                 dataKey="Purchases"
//                 nameKey="Method"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={100}
//                 label
//               >
//                 {purchasesByPayment.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

export default function RetailDashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:5001/customer/retail_master/all")
      .then(res => setData(res.data.results || []))
      .catch(err => console.error(err));
  }, []);

  // ---------- KPIs ----------
  const totalCustomers = new Set(data.map(item => item.Customer_ID)).size;
  const totalTransactions = data.length;
  const totalRevenue = data.reduce((acc, item) => acc + parseFloat(item.Total_Amount || 0), 0);

  // Purchases by Year
  const purchasesByYear = Object.values(
    data.reduce((acc, item) => {
      const year = item.Year;
      acc[year] = acc[year] || { Year: year, Purchases: 0 };
      acc[year].Purchases += parseInt(item.Total_Purchases || 0);
      return acc;
    }, {})
  );

  // Purchases by Product Category
  const purchasesByCategory = Object.values(
    data.reduce((acc, item) => {
      const category = item.Product_Category;
      acc[category] = acc[category] || { Category: category, Purchases: 0 };
      acc[category].Purchases += parseInt(item.Total_Purchases || 0);
      return acc;
    }, {})
  );

  // Purchases by Payment Method
  const purchasesByPayment = Object.values(
    data.reduce((acc, item) => {
      const method = item.Payment_Method;
      acc[method] = acc[method] || { Method: method, Purchases: 0 };
      acc[method].Purchases += parseInt(item.Total_Purchases || 0);
      return acc;
    }, {})
  );

  // Feedback Summary
  const feedbackSummary = Object.values(
    data.reduce((acc, item) => {
      const feedback = item.Feedback || "Unknown";
      acc[feedback] = acc[feedback] || { Feedback: feedback, Count: 0 };
      acc[feedback].Count += 1;
      return acc;
    }, {})
  );

  return (
    <div className="p-6">

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow rounded-2xl p-4 text-center">
          <h3 className="font-bold text-gray-500">Total Customers</h3>
          <p className="text-2xl">{totalCustomers}</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 text-center">
          <h3 className="font-bold text-gray-500">Total Transactions</h3>
          <p className="text-2xl">{totalTransactions}</p>
        </div>
        <div className="bg-white shadow rounded-2xl p-4 text-center">
          <h3 className="font-bold text-gray-500">Total Revenue</h3>
          <p className="text-2xl">${totalRevenue.toFixed(2)}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Purchases by Year */}
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-bold mb-4">Purchases by Year</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={purchasesByYear}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Purchases" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Purchases by Product Category */}
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-bold mb-4">Purchases by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={purchasesByCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Purchases" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Purchases by Payment Method */}
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-bold mb-4">Purchases by Payment Method</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={purchasesByPayment}
                dataKey="Purchases"
                nameKey="Method"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {purchasesByPayment.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Feedback Summary */}
        <div className="bg-white shadow rounded-2xl p-4">
          <h2 className="text-lg font-bold mb-4">Customer Feedback</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={feedbackSummary}
                dataKey="Count"
                nameKey="Feedback"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {feedbackSummary.map((entry, index) => (
                  <Cell key={`cell-feedback-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
