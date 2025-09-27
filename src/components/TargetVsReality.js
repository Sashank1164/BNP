import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './TargetVsReality.css';

const TargetVsReality = () => {
  const data = [
    { month: 'Jan', reality: 1.2, target: 1.8 },
    { month: 'Feb', reality: 1.4, target: 2.0 },
    { month: 'Mar', reality: 1.6, target: 2.2 },
    { month: 'Apr', reality: 1.8, target: 2.4 },
    { month: 'May', reality: 2.0, target: 2.6 },
    { month: 'Jun', reality: 1.8, target: 2.4 },
    { month: 'Jul', reality: 2.2, target: 2.8 }
  ];

  return (
    <div className="target-vs-reality">
      <div className="card-header">
        <h3>Target vs Reality</h3>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
              domain={[0, 3]}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: 'none',
                borderRadius: '10px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value, name) => [`${value}k`, name === 'reality' ? 'Reality Sales' : 'Target Sales']}
            />
            <Bar 
              dataKey="reality" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]}
              name="Reality Sales"
            />
            <Bar 
              dataKey="target" 
              fill="#f59e0b" 
              radius={[4, 4, 0, 0]}
              name="Target Sales"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
          <span>Reality Sales (8,823)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#f59e0b' }}></div>
          <span>Target Sales (13,807)</span>
        </div>
      </div>
    </div>
  );
};

export default TargetVsReality;
