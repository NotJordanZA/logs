import React from 'react';
import '../styling/StarDistribution.css';

const StarDistribution = ({ logs }) => {
  const calculateDistribution = (ratingType) => {
    const distribution = Array(10).fill(0); // 10 steps for half stars
    logs.forEach(log => {
      const rating = Math.round(log[ratingType] * 2) / 2; // Round to nearest 0.5
      if (rating >= 0.5 && rating <= 5) {
        const index = (rating * 2) - 1; // Convert rating to array index
        distribution[index]++;
      }
    });

    const total = distribution.reduce((a, b) => a + b, 0);
    return distribution.map(count => ({
      count,
      percentage: total > 0 ? (count / total) * 100 : 0
    }));
  };

  const renderDistributionBar = (distribution) => {
    const maxPercentage = Math.max(...distribution.map(d => d.percentage));
    
    return (
      <div className="distribution-container">
        <div className="distribution-bars">
          {distribution.map((data, index) => (
            <div key={index} className="distribution-bar">
              <div className="bar-container">
                <div 
                  className="bar"
                  style={{ 
                    height: `${(data.percentage / maxPercentage) * 100}%`
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="rating-scale">
          <span className="scale-label">0.5★</span>
          <div className="scale-line"></div>
          <span className="scale-label">5.0★</span>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="stat-card">
        <h3>Poop Quality Distribution</h3>
        {renderDistributionBar(calculateDistribution('poopQuality'))}
      </div>
      <div className="stat-card">
        <h3>Wipe Quality Distribution</h3>
        {renderDistributionBar(calculateDistribution('wipeQuality'))}
      </div>
    </>
  );
};

export default StarDistribution; 