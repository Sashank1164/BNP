import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './CustomerSatisfaction.css';

const CustomerSatisfaction = () => {
  const data = [
    { period: 'Week 1', lastMonth: 2.8, thisMonth: 3.2 },
    { period: 'Week 2', lastMonth: 2.9, thisMonth: 3.4 },
    { period: 'Week 3', lastMonth: 3.0, thisMonth: 3.6 },
    { period: 'Week 4', lastMonth: 3.1, thisMonth: 3.8 },
    { period: 'Week 5', lastMonth: 3.0, thisMonth: 4.0 },
    { period: 'Week 6', lastMonth: 2.9, thisMonth: 4.2 },
    { period: 'Week 7', lastMonth: 2.8, thisMonth: 4.4 },
    { period: 'Week 8', lastMonth: 2.7, thisMonth: 4.5 }
  ];

  return (
    <div className="customer-satisfaction">
      <div className="card-header">
        <h3>Customer Satisfaction</h3>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="period" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              domain={[2, 5]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value, name) => [`$${value}`, name === 'lastMonth' ? 'Last Month' : 'This Month']}
            />
            <Line 
              type="monotone" 
              dataKey="lastMonth" 
              stroke="#3b82f6" 
              strokeWidth={3}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="thisMonth" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
          <span>Last Month ($3,004)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
          <span>This Month ($4,504)</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerSatisfaction;
