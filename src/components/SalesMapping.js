import React from 'react';
import './SalesMapping.css';

const SalesMapping = () => {
  const countries = [
    { name: 'USA', color: '#ff8c42', sales: '35%' },
    { name: 'Brazil', color: '#ef4444', sales: '28%' },
    { name: 'India', color: '#8b5cf6', sales: '22%' },
    { name: 'Indonesia', color: '#10b981', sales: '15%' }
  ];

  return (
    <div className="sales-mapping">
      <div className="card-header">
        <h3>Sales Mapping by Country</h3>
      </div>
      
      <div className="map-container">
        <div className="world-map">
          {/* Simplified world map representation */}
          <div className="map-region usa" style={{ backgroundColor: '#ff8c42' }}></div>
          <div className="map-region brazil" style={{ backgroundColor: '#ef4444' }}></div>
          <div className="map-region india" style={{ backgroundColor: '#8b5cf6' }}></div>
          <div className="map-region indonesia" style={{ backgroundColor: '#10b981' }}></div>
        </div>
      </div>
      
      <div className="countries-legend">
        {countries.map((country, index) => (
          <div key={index} className="country-item">
            <div 
              className="country-color" 
              style={{ backgroundColor: country.color }}
            ></div>
            <span className="country-name">{country.name}</span>
            <span className="country-sales">{country.sales}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesMapping;
