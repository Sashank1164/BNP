import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Retail.css';

const Retail = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://7vfbqc23-5001.asse.devtunnels.ms/customer/master/all')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching retail data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading Retail Data...</p>;

  const chartData = data.map(item => ({
    category: item.Product_Category,
    amount: parseFloat(item.Amount)
  }));

  return (
    <div className="retail-container">
      <h2>Retail Analytics</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Retail;
