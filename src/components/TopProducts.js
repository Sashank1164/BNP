import React from 'react';
import './TopProducts.css';

const TopProducts = () => {
  const products = [
    {
      name: 'Home Decor Range',
      sales: 45,
      color: '#3b82f6'
    },
    {
      name: 'Disney Princess Pink Bag IB',
      sales: 20,
      color: '#8b5cf6'
    },
    {
      name: 'Bathroom Essentials',
      sales: 18,
      color: '#10b981'
    },
    {
      name: 'Apple Smartwatches',
      sales: 25,
      color: '#f59e0b'
    }
  ];

  return (
    <div className="top-products">
      <div className="card-header">
        <h3>Top Products</h3>
      </div>
      
      <div className="products-list">
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <div className="product-info">
              <div className="product-name">{product.name}</div>
              <div className="product-sales">{product.sales}% sales</div>
            </div>
            <div className="progress-container">
              <div 
                className="progress-bar"
                style={{ 
                  width: `${product.sales}%`,
                  backgroundColor: product.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopProducts;
