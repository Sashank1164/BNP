import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './VolumeVsService.css';

const VolumeVsService = () => {
  const data = [
    { category: 'A', volume: 2.2, service: 1.3 },
    { category: 'B', volume: 1.8, service: 1.1 },
    { category: 'C', volume: 2.5, service: 1.4 },
    { category: 'D', volume: 1.9, service: 1.2 },
    { category: 'E', volume: 2.1, service: 1.3 }
  ];

  return (
    <div className="volume-vs-service">
      <div className="card-header">
        <h3>Volume vs Service Level</h3>
      </div>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="category" 
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
              formatter={(value, name) => [`${value}`, name === 'volume' ? 'Volume' : 'Services']}
            />
            <Bar 
              dataKey="volume" 
              fill="#3b82f6" 
              radius={[4, 4, 0, 0]}
              name="Volume"
            />
            <Bar 
              dataKey="service" 
              fill="#10b981" 
              radius={[4, 4, 0, 0]}
              name="Services"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#3b82f6' }}></div>
          <span>Volume (1,135)</span>
        </div>
        <div className="legend-item">
          <div className="legend-color" style={{ backgroundColor: '#10b981' }}></div>
          <span>Services (635)</span>
        </div>
      </div>
    </div>
  );
};

export default VolumeVsService;
