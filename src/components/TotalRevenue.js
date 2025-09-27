import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './TotalRevenue.css';

const TotalRevenue = () => {
  const data = [
    { day: 'Mon', online: 8, offline: 6 },
    { day: 'Tue', online: 12, offline: 8 },
    { day: 'Wed', online: 18, offline: 12 },
    { day: 'Thu', online: 14, offline: 10 },
    { day: 'Fri', online: 16, offline: 11 },
    { day: 'Sat', online: 15, offline: 9 },
    { day: 'Sun', online: 20, offline: 14 }
  ];

  return (
    <div className="total-revenue">
      <div className="card-header">
        <h3>Total Revenue</h3>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              domain={[0, 20]}
              ticks={[5, 10, 15, 20]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value, name) => [`${value}k`, name === 'online' ? 'Online Sales' : 'Offline Sales']}
            />
            <Bar 
              dataKey="online" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]}
              name="Online Sales"
            />
            <Bar 
              dataKey="offline" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]}
              name="Offline Sales"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
          <span>Online Sales</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
          <span>Offline Sales</span>
        </div>
      </div>
    </div>
  );
};

export default TotalRevenue;
