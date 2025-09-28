// src/components/Upi.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "./Upi.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0", "#FF3366"];

const Upi = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5001/customer/transactions_master/all") // replace with your API
      .then((res) => setData(res.data.results || []))
      .catch((err) => console.error(err));
  }, []);

  if (!data.length) return <p>Loading UPI Dashboard...</p>;

  // --- Aggregate Data ---
  const totalTransactions = data.length;
  const totalAmount = data.reduce((sum, t) => sum + parseFloat(t["amount (INR)"] || 0), 0);

  // Transactions by Merchant Category
  const categoryData = Object.values(
    data.reduce((acc, t) => {
      const category = t.merchant_category || "Unknown";
      acc[category] = acc[category] || { category, count: 0 };
      acc[category].count += 1;
      return acc;
    }, {})
  );

  // Transactions by Hour
  const hourData = Object.values(
    data.reduce((acc, t) => {
      const hour = t.hour_of_day || "0";
      acc[hour] = acc[hour] || { hour, count: 0 };
      acc[hour].count += 1;
      return acc;
    }, {})
  );

  // Transaction status distribution
  const statusData = Object.values(
    data.reduce((acc, t) => {
      const status = t.transaction_status || "Unknown";
      acc[status] = acc[status] || { status, count: 0 };
      acc[status].count += 1;
      return acc;
    }, {})
  );

  // Fraudulent Transactions
  const fraudData = Object.values(
    data.reduce((acc, t) => {
      const fraud = t.fraud_flag === "1" ? "Fraud" : "Normal";
      acc[fraud] = acc[fraud] || { type: fraud, count: 0 };
      acc[fraud].count += 1;
      return acc;
    }, {})
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">UPI Dashboard</h1>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-bold text-lg">Total Transactions</h2>
          <p className="text-xl">{totalTransactions}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-bold text-lg">Total Amount (INR)</h2>
          <p className="text-xl">{totalAmount.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 shadow rounded">
          <h2 className="font-bold text-lg">Fraudulent Transactions</h2>
          <p className="text-xl">{fraudData.find(d => d.type === "Fraud")?.count || 0}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Merchant Category */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-2">Transactions by Merchant Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hour of Day */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-2">Transactions by Hour</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hourData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Transaction Status */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-2">Transaction Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="count"
                nameKey="status"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Fraud Distribution */}
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-lg font-bold mb-2">Fraud vs Normal Transactions</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={fraudData}
                dataKey="count"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {fraudData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Upi;
