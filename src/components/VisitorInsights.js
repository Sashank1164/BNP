import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './VisitorInsights.css';

const VisitorInsights = () => {
  const data = [
    { month: 'Jan', loyal: 120, new: 80, unique: 200 },
    { month: 'Feb', loyal: 140, new: 90, unique: 230 },
    { month: 'Mar', loyal: 160, new: 100, unique: 260 },
    { month: 'Apr', loyal: 180, new: 110, unique: 290 },
    { month: 'May', loyal: 200, new: 120, unique: 320 },
    { month: 'Jun', loyal: 220, new: 130, unique: 350 },
    { month: 'Jul', loyal: 240, new: 140, unique: 380 },
    { month: 'Aug', loyal: 260, new: 150, unique: 410 },
    { month: 'Sep', loyal: 240, new: 140, unique: 380 },
    { month: 'Oct', loyal: 220, new: 130, unique: 350 },
    { month: 'Nov', loyal: 200, new: 120, unique: 320 },
    { month: 'Dec', loyal: 180, new: 110, unique: 290 }
  ];

  return (
    <div className="visitor-insights">
      <div className="card-header">
        <h3>Visitor Insights</h3>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="loyal" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#8b5cf6', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="new" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#10b981', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="unique" 
              stroke="#ef4444" 
              strokeWidth={3}
              dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#ef4444', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#8b5cf6' }}></div>
          <span>Loyal Customers</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
          <span>New Customers</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#ef4444' }}></div>
          <span>Unique Customers</span>
        </div>
      </div>
    </div>
  );
};

export default VisitorInsights;
