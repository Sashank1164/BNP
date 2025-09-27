import React from 'react';
import './TodaysSales.css';
import { FiDownload } from 'react-icons/fi';

const TodaysSales = () => {
  const salesData = [
    {
      title: 'Total Sales',
      value: '$1k',
      change: '+5% from yesterday',
      color: '#ff6b9d',
      bgColor: '#ffeef2'
    },
    {
      title: 'Total Order',
      value: '300',
      change: '+5% from yesterday',
      color: '#ff8c42',
      bgColor: '#fff4e6'
    },
    {
      title: 'Product Sold',
      value: '5',
      change: '+12% from yesterday',
      color: '#4ecdc4',
      bgColor: '#e8f8f5'
    },
    {
      title: 'New Customers',
      value: '8',
      change: '+0.1% from yesterday',
      color: '#a8e6cf',
      bgColor: '#f0fdf4'
    }
  ];

  return (
    <div className="todays-sales">
      <div className="card-header">
        <h3>Today's Sales</h3>
        <button className="export-button">
          <FiDownload className="export-icon" />
          Export
        </button>
      </div>
      
      <div className="sales-grid">
        {salesData.map((item, index) => (
          <div key={index} className="sales-item">
            <div 
              className="sales-icon"
              style={{ 
                backgroundColor: item.bgColor,
                color: item.color 
              }}
            >
              {item.title.charAt(0)}
            </div>
            <div className="sales-content">
              <div className="sales-value" style={{ color: item.color }}>
                {item.value}
              </div>
              <div className="sales-title">{item.title}</div>
              <div className="sales-change">{item.change}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysSales;
